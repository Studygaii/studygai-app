import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardChatHistory() {
  const recentChats = [
    {
      id: 1,
      name: "Calculus Group",
      message: "Can someone explain chain rule?",
      time: "2m ago",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      online: true
    },
    {
      id: 2,
      name: "Dr. Ethan Clark",
      message: "Assignment 3 deadline updated.",
      time: "1h ago",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face",
      online: false
    },
    {
      id: 3,
      name: "Study Buddy (Alex)",
      message: "Ready for the quiz?",
      time: "3h ago",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
      online: true
    },
  ];

  return (
    <Card className="rounded-2xl shadow-sm border border-border animate-fade-in flex-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </div>
          <CardTitle className="text-lg font-semibold">Chats</CardTitle>
        </div>
        <button className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          View All <ArrowRight className="h-3 w-3" />
        </button>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        {recentChats.map((chat) => (
          <div key={chat.id} className="flex items-start gap-3 group cursor-pointer hover:bg-secondary/30 p-2 -mx-2 rounded-xl transition-colors">
            <div className="relative">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={chat.avatar} />
                <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {chat.online && (
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-0.5">
                <h4 className="text-sm font-semibold truncate pr-2">{chat.name}</h4>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{chat.time}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate group-hover:text-foreground transition-colors">
                {chat.message}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
