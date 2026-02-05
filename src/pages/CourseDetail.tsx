import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Upload,
  MessageSquare,
  Bookmark,
  FileQuestion,
  Send,
  Loader2,
  FileText,
  Image,
  ChevronLeft,
  Sparkles,
  Zap,
  Users,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  courseRequests,
  uploadRequests,
  chatRequests,
  flashcardRequests,
  quizRequests,
} from "@/services";
import { useUserStore } from "@/store";
import { axiosErrorToast, toastSuccess } from "@/lib/utils/toast";

const ACCEPTED_FILES = ".pdf,.doc,.docx,.txt,.ppt,.pptx,.md,.png,.jpg,.jpeg,.webp";

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const { data: courseData, isLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => courseRequests.list(),
    enabled: !!courseId,
  });

  const course = courseData?.data?.courses?.find((c: any) => c._id === courseId);

  const uploadMutation = useMutation({
    mutationFn: (files: File[]) => uploadRequests.uploadDoc(files, courseId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      toastSuccess("Document uploaded and processed!");
    },
    onError: (err) => axiosErrorToast(err),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length && courseId) {
      uploadMutation.mutate(files);
    }
    e.target.value = "";
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !courseId || isSending) return;
    const userMsg = message.trim();
    setMessage("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsSending(true);

    try {
      const res = await chatRequests.send(
        [...messages, { role: "user", content: userMsg }].map((m) => ({
          role: m.role,
          content: m.content,
        })),
        courseId
      );
      const aiContent =
        res.data?.choices?.[0]?.message?.content ??
        res.data?.message ??
        res.data?.content ??
        "I couldn't generate a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: aiContent }]);
    } catch (err) {
      axiosErrorToast(err);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsSending(false);
    }
  };

  const generateFlashcards = useMutation({
    mutationFn: () => flashcardRequests.generateFromPdf(courseId!),
    onSuccess: () => {
      toastSuccess("Flashcards generated!");
    },
    onError: (err) => axiosErrorToast(err),
  });

  const generateQuiz = useMutation({
    mutationFn: () =>
      quizRequests.generate(courseId!, { numQuestions: 8, quizType: "quiz" }),
    onSuccess: () => {
      toastSuccess("Quiz generated!");
    },
    onError: (err) => axiosErrorToast(err),
  });

  if (isLoading || !courseId) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground mb-4">Course not found</p>
        <Link to="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1 flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground text-sm">
              {course.pdfProcessed ? "Ready for AI chat & study tools" : "Upload documents to get started"}
            </p>
          </div>
          <Link to={`/groupchats?course=${courseId}`}>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Group Chats
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="chat" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            AI Chat
          </TabsTrigger>
          <TabsTrigger value="upload" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="gap-2">
            <Bookmark className="h-4 w-4" />
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="quiz" className="gap-2">
            <FileQuestion className="h-4 w-4" />
            Quiz
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <Card className="rounded-2xl border border-border overflow-hidden">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Study Assistant
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Ask questions about your course materials. AI uses your uploaded documents for context.
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[480px] p-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <MessageSquare className="h-16 w-16 text-muted-foreground/40 mb-4" />
                    <p className="text-muted-foreground mb-2">Start a conversation</p>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Ask anything about your course content. Try: &quot;Summarize chapter 3&quot; or &quot;Explain the key concepts&quot;
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                            m.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                        </div>
                      </div>
                    ))}
                    {isSending && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-2xl px-4 py-3">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about your course..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                    disabled={isSending || !course.pdfProcessed}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isSending || !message.trim() || !course.pdfProcessed}
                    size="icon"
                    className="shrink-0"
                  >
                    {isSending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {!course.pdfProcessed && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Upload documents first to enable AI chat.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload">
          <Card className="rounded-2xl border border-border overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Documents
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Upload PDF, DOCX, TXT, or images (PNG, JPG, JPEG, WEBP). Text will be extracted and stored for AI chat.
              </p>
            </CardHeader>
            <CardContent>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_FILES}
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:bg-muted/50 transition-colors cursor-pointer"
              >
                {uploadMutation.isPending ? (
                  <Loader2 className="h-16 w-16 mx-auto text-muted-foreground animate-spin mb-4" />
                ) : (
                  <>
                    <div className="flex justify-center gap-4 mb-4">
                      <FileText className="h-16 w-16 text-muted-foreground" />
                      <Image className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <p className="font-medium mb-1">Drop files or click to upload</p>
                    <p className="text-sm text-muted-foreground">
                      PDF, DOCX, TXT, PPT, PPTX, MD, PNG, JPG, JPEG, WEBP (max 50MB)
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flashcards">
          <Card className="rounded-2xl border border-border overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bookmark className="h-5 w-5" />
                Flashcards
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Generate AI flashcards from your course content.
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center py-12">
                <Zap className="h-16 w-16 text-primary/60 mb-4" />
                <Button
                  onClick={() => generateFlashcards.mutate()}
                  disabled={generateFlashcards.isPending || !course.pdfProcessed}
                >
                  {generateFlashcards.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Generate Flashcards
                </Button>
                {!course.pdfProcessed && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Upload documents first.
                  </p>
                )}
                <Link to={`/flashcards?course=${courseId}`} className="mt-4">
                  <Button variant="outline">View Flashcards</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz">
          <Card className="rounded-2xl border border-border overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileQuestion className="h-5 w-5" />
                Quiz
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Generate a quiz from your course content.
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center py-12">
                <FileQuestion className="h-16 w-16 text-primary/60 mb-4" />
                <Button
                  onClick={() => generateQuiz.mutate()}
                  disabled={generateQuiz.isPending || !course.pdfProcessed}
                >
                  {generateQuiz.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Generate Quiz
                </Button>
                {!course.pdfProcessed && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Upload documents first.
                  </p>
                )}
                <Link to={`/quizzes?course=${courseId}`} className="mt-4">
                  <Button variant="outline">View Quizzes</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
