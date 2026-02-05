import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { GripVertical, CheckSquare, Plus, Maximize2, MoreHorizontal, Loader2, BookOpen } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { courseRequests } from "@/services";
import { useUserStore } from "@/store";
import { axiosErrorToast, toastSuccess } from "@/lib/utils/toast";
import { Link } from "react-router-dom";

const COURSE_COLORS = [
  { bg: "bg-[#A7D8CD]", text: "text-[#3A7D71]" },
  { bg: "bg-[#1E3F3B]", text: "text-[#E0E7E5]" },
  { bg: "bg-[#0EA5E9]", text: "text-white" },
  { bg: "bg-[#F97316]", text: "text-white" },
  { bg: "bg-[#FFC107]", text: "text-gray-900" },
  { bg: "bg-[#60A5FA]", text: "text-white" },
];

export function MyCoursesCard() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await courseRequests.list();
      return res.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (body: { title: string; description?: string }) =>
      courseRequests.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      setOpen(false);
      setTitle("");
      setDescription("");
      toastSuccess("Course created!");
    },
    onError: (err) => axiosErrorToast(err),
  });

  const courses = data?.data?.courses ?? [];
  const userId = user?.id ?? "";

  const handleCreate = () => {
    if (!title.trim()) return;
    createMutation.mutate({ title: title.trim(), description: description.trim() || undefined });
  };

  return (
    <Card className="rounded-2xl shadow-sm border border-border animate-fade-in overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-6 pt-6">
        <div className="flex items-center gap-3">
          <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-grab" />
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <CheckSquare className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-lg font-semibold">My Courses</CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors group">
                <Plus className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Course</DialogTitle>
                <DialogDescription>
                  Add a new course to upload documents and study with AI.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Calculus 101"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the course"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreate}
                  disabled={!title.trim() || createMutation.isPending}
                >
                  {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors group">
            <Maximize2 className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors group">
            <MoreHorizontal className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
          </div>
        ) : courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground mb-4">No courses yet</p>
            <Button onClick={() => setOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create your first course
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: any, idx: number) => {
              const color = COURSE_COLORS[idx % COURSE_COLORS.length];
              return (
                <Link
                  key={course._id}
                  to={`/courses/${course._id}`}
                  className="group cursor-pointer block"
                >
                  <div className="bg-secondary/30 rounded-2xl p-8 mb-4 flex items-center justify-center aspect-square relative group-hover:bg-secondary/50 transition-colors rounded-2xl overflow-hidden">
                    <div
                      className={`relative w-4/5 h-[90%] rounded-r-lg shadow-xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl ${color.bg}`}
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-black/10 rounded-l-sm z-10 border-r border-white/10" />
                      <div className="absolute flex flex-col items-center justify-center w-full h-full p-4 text-center">
                        <span
                          className={`text-[10px] uppercase tracking-wider font-semibold opacity-70 mb-8 ${color.text}`}
                        >
                          Course
                        </span>
                        <h4
                          className={`font-serif text-lg leading-tight mb-2 ${color.text} line-clamp-2`}
                        >
                          {course.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {course.pdfProcessed ? "Ready for AI chat" : "Upload documents to start"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
