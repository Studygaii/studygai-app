import { Clock, MessageSquare, CheckCircle2, Circle, FileText } from "lucide-react";

const activities = [
  { 
    id: 1, 
    type: "chat", 
    title: "AI Chat: Calculus derivatives", 
    time: "2 hours ago",
    icon: MessageSquare,
    status: "completed"
  },
  { 
    id: 2, 
    type: "quiz", 
    title: "Completed Quiz: Biology Ch. 3", 
    time: "Yesterday",
    icon: CheckCircle2,
    status: "completed",
    score: "85%"
  },
  { 
    id: 3, 
    type: "quiz", 
    title: "Unfinished Quiz: History", 
    time: "2 days ago",
    icon: Circle,
    status: "incomplete"
  },
  { 
    id: 4, 
    type: "upload", 
    title: "Uploaded: Physics notes.pdf", 
    time: "3 days ago",
    icon: FileText,
    status: "completed"
  },
];

export function RecentActivitySection() {
  return (
    <section className="border border-border rounded-2xl p-5 bg-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="font-display font-semibold text-lg">Recent Activity</h2>
        </div>
        <button className="text-sm text-primary font-medium hover:underline">View all</button>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-3 p-3 border border-border rounded-xl hover:bg-muted/50 transition-all"
          >
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
              activity.status === "completed" ? "bg-success/10" : "bg-warning/10"
            }`}>
              <activity.icon className={`h-4 w-4 ${
                activity.status === "completed" ? "text-success" : "text-warning"
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
            {activity.score && (
              <span className="text-sm font-semibold text-success">{activity.score}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
