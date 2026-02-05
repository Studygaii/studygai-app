import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare, Plus, Users, ChevronRight, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { groupchatRequests, courseRequests } from "@/services";
import { useUserStore } from "@/store";
import { axiosErrorToast, toastSuccess } from "@/lib/utils/toast";

export default function GroupChats() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("course");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [memberIds, setMemberIds] = useState("");
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const { data: coursesData } = useQuery({
    queryKey: ["courses"],
    queryFn: () => courseRequests.list(),
  });

  const courses = coursesData?.data?.courses ?? [];
  const selectedCourseId = courseId || courses[0]?._id;

  const { data: groupChatsData, isLoading } = useQuery({
    queryKey: ["groupchats", selectedCourseId],
    queryFn: () => groupchatRequests.list(selectedCourseId),
    enabled: !!selectedCourseId,
  });

  const groupChats = groupChatsData?.data?.groupChats ?? [];

  const createMutation = useMutation({
    mutationFn: () =>
      groupchatRequests.create({
        name,
        creator: user!.id,
        members: memberIds
          ? memberIds.split(",").map((id) => id.trim()).filter(Boolean)
          : [],
        course: selectedCourseId!,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupchats", selectedCourseId] });
      setOpen(false);
      setName("");
      setMemberIds("");
      toastSuccess("Group chat created!");
    },
    onError: (err) => axiosErrorToast(err),
  });

  const handleCreate = () => {
    if (!name.trim() || !selectedCourseId || !user) return;
    createMutation.mutate();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Group Chats</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Create study groups and mention <strong>@studygai</strong> to get AI help
        </p>
      </div>

      <Card className="rounded-2xl border border-border overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            My Group Chats
          </CardTitle>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button disabled={!selectedCourseId}>
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Group Chat</DialogTitle>
                <DialogDescription>
                  Add a name and optionally member IDs (comma-separated). Max 5 members.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Group Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Calculus Study Group"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="members">Member IDs (optional, comma-separated)</Label>
                  <Input
                    id="members"
                    placeholder="User ID 1, User ID 2"
                    value={memberIds}
                    onChange={(e) => setMemberIds(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreate} disabled={!name.trim() || createMutation.isPending}>
                  {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {!selectedCourseId ? (
            <p className="text-muted-foreground py-8 text-center">
              Select a course first. <Link to="/dashboard" className="text-primary underline">Go to Dashboard</Link>
            </p>
          ) : isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
            </div>
          ) : groupChats.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <Users className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground mb-4">No group chats yet</p>
              <Button onClick={() => setOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create your first group
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {groupChats.map((gc: any) => (
                <Link
                  key={gc._id}
                  to={`/groupchats/${gc._id}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary">{gc.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {gc.members?.length || 0} members
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        Tip: In a group chat, type <code className="bg-muted px-1 rounded">@studygai</code> followed
        by your question to get AI help based on your course materials.
      </p>
    </div>
  );
}
