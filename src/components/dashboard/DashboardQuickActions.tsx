import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileQuestion, Layers, PenTool, Upload, Zap } from "lucide-react";

export function DashboardQuickActions() {
  const actions = [
    { icon: Users, label: "Start Group Study", color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: FileQuestion, label: "Create Quiz", color: "text-green-500", bg: "bg-green-500/10" },
    { icon: Layers, label: "Create Flashcard", color: "text-purple-500", bg: "bg-purple-500/10" },
    { icon: PenTool, label: "Start Exam", color: "text-orange-500", bg: "bg-orange-500/10" },
    { icon: Upload, label: "Upload Past Question", color: "text-pink-500", bg: "bg-pink-500/10" },
  ];

  return (
    <Card className="rounded-2xl shadow-sm border border-border animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 pt-2">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] border border-transparent hover:border-border hover:shadow-sm ${index === actions.length - 1 ? "col-span-2 flex-row gap-3" : ""
              } bg-secondary/30 hover:bg-secondary/50`}
          >
            <div className={`p-2.5 rounded-full mb-2 ${action.bg} ${index === actions.length - 1 ? "mb-0" : ""}`}>
              <action.icon className={`h-5 w-5 ${action.color}`} />
            </div>
            <span className="text-xs font-medium text-center">{action.label}</span>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
