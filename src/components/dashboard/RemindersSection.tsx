import { Bell, ChevronRight } from "lucide-react";

const reminders = [
  { id: 1, title: "Quiz: Calculus Chapter 5", time: "Today, 3:00 PM", type: "quiz" },
  { id: 2, title: "Review flashcards - Biology", time: "Tomorrow, 10:00 AM", type: "flashcard" },
  { id: 3, title: "Assignment deadline", time: "Dec 20, 11:59 PM", type: "assignment" },
];

export function RemindersSection() {
  return (
    <section className="border border-border rounded-2xl p-5 bg-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="font-display font-semibold text-lg">Reminders</h2>
        </div>
        <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
          {reminders.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {reminders.map((reminder) => (
          <button
            key={reminder.id}
            className="w-full flex items-center gap-3 p-3 border border-border rounded-xl hover:border-primary/50 hover:bg-muted/50 transition-all text-left group"
          >
            <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{reminder.title}</p>
              <p className="text-xs text-muted-foreground">{reminder.time}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        ))}
      </div>
    </section>
  );
}
