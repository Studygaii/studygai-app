import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeft,
  Send,
  Loader2,
  Users,
  UserPlus,
  UserMinus,
  Bot,
  MessageSquare,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  groupchatRequests,
  courseRequests,
} from "@/services";
import { useUserStore } from "@/store";
import { useGroupChatSocket } from "@/hooks/useGroupChatSocket";
import { axiosErrorToast, toastSuccess } from "@/lib/utils/toast";

const MENTION_TRIGGER = "@studygai";

export default function GroupChatRoom() {
  const { groupChatId } = useParams<{ groupChatId: string }>();
  const [inputValue, setInputValue] = useState("");
  const [showMentionHint, setShowMentionHint] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, token } = useUserStore();
  const queryClient = useQueryClient();

  const {
    connected,
    messages,
    setMessagesFromHistory,
    clearMessages,
    joinRoom,
    leaveRoom,
    sendMessage,
  } = useGroupChatSocket(token);

  const { data: groupChatData } = useQuery({
    queryKey: ["groupchat", groupChatId],
    queryFn: () => groupchatRequests.get(groupChatId!),
    enabled: !!groupChatId,
  });

  const groupChat = groupChatData?.data?.groupChat;
  const courseId = groupChat?.course?._id || groupChat?.course;

  useEffect(() => {
    if (!groupChatId || !user?.fullName || !token) return;
    joinRoom(groupChatId, user.fullName);
    return () => {
      leaveRoom(groupChatId);
    };
  }, [groupChatId, user?.fullName, token, joinRoom, leaveRoom]);

  useEffect(() => {
    if (groupChat?.messages?.length) {
      const hist = groupChat.messages.map((m: any) => ({
        userId: m.sender?._id || "studygai",
        userName: m.senderName || "StudyGAI",
        message: m.content,
        roomId: groupChatId!,
        timestamp: m.date,
        isAI: m.isAI,
      }));
      setMessagesFromHistory(hist);
    } else {
      clearMessages();
    }
  }, [groupChat?._id, groupChat?.messages, setMessagesFromHistory, clearMessages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setInputValue(v);
    setShowMentionHint(v.toLowerCase().includes("@stu"));
  };

  const insertMention = () => {
    const idx = inputValue.toLowerCase().lastIndexOf("@stu");
    const before = idx >= 0 ? inputValue.slice(0, idx) : inputValue;
    const after = idx >= 0 ? inputValue.slice(idx + 4) : "";
    setInputValue(before + MENTION_TRIGGER + " " + after);
    setShowMentionHint(false);
    inputRef.current?.focus();
  };

  const sendViaRest = useMutation({
    mutationFn: (msg: string) => groupchatRequests.sendMessage(groupChatId!, msg),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupchat", groupChatId] });
    },
    onError: (err) => axiosErrorToast(err),
  });

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text || !groupChatId) return;
    if (connected) {
      sendMessage(groupChatId, text, {
        groupChatId,
        courseId: courseId?.toString?.() || courseId,
      });
    } else {
      sendViaRest.mutate(text);
    }
    setInputValue("");
    setShowMentionHint(false);
  };

  const addMemberMutation = useMutation({
    mutationFn: (userId: string) =>
      groupchatRequests.addMember({ groupChatId: groupChatId!, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupchat", groupChatId] });
      toastSuccess("Member added");
    },
    onError: (err) => axiosErrorToast(err),
  });

  const removeMemberMutation = useMutation({
    mutationFn: (userId: string) =>
      groupchatRequests.removeMember({ groupChatId: groupChatId!, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupchat", groupChatId] });
      toastSuccess("Member removed");
    },
    onError: (err) => axiosErrorToast(err),
  });

  if (!groupChat) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const members = groupChat.members || [];
  const isCreator = groupChat.creator?._id === user?.id || groupChat.creator === user?.id;

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div className="flex items-center gap-4">
          <Link to={`/courses/${courseId}`}>
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">{groupChat.name}</h1>
            <p className="text-sm text-muted-foreground">
              {members.length} members • {connected ? "Connected" : "Connecting..."}
            </p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Members
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Group Members</DialogTitle>
              <DialogDescription>Add or remove members from this group chat.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-4">
              {members.map((m: any) => {
                const mid = m._id || m;
                const name = m.username || m.fullName || "User";
                const isCurrentUser = mid === user?.id;
                return (
                  <div
                    key={mid}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={m.avatar} />
                        <AvatarFallback>{name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{name}</span>
                    </div>
                    {isCreator && !isCurrentUser && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMemberMutation.mutate(mid)}
                        disabled={removeMemberMutation.isPending}
                      >
                        <UserMinus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                );
              })}
              {isCreator && members.length < 5 && (
                <p className="text-sm text-muted-foreground">
                  Add members via member ID (user search can be added later).
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Messages */}
      <Card className="flex-1 flex flex-col overflow-hidden rounded-2xl">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <MessageSquare className="h-16 w-16 text-muted-foreground/40 mb-4" />
                <p className="text-muted-foreground mb-2">No messages yet</p>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Type a message and use <strong>@studygai</strong> to ask the AI a question
                </p>
              </div>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.userId === user?.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 flex gap-2 ${
                      m.isAI
                        ? "bg-primary/10 border border-primary/20"
                        : m.userId === user?.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {m.isAI && <Bot className="h-4 w-4 shrink-0 mt-0.5" />}
                    <div>
                      {!m.isAI && m.userId !== user?.id && (
                        <p className="text-xs font-medium mb-1">{m.userName}</p>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{m.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t p-4">
          {showMentionHint && (
            <button
              type="button"
              onClick={insertMention}
              className="mb-2 flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-sm"
            >
              <Bot className="h-4 w-4" />
              Mention @studygai for AI help
            </button>
          )}
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              placeholder="Type a message... Use @studygai to ask AI"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button onClick={handleSend} disabled={!inputValue.trim()} size="icon" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
