import { MessageSquare, HelpCircle, Layers, Upload } from "lucide-react";

const actions = [
  { icon: MessageSquare, label: "AI Chat", color: "bg-primary", description: "Ask questions" },
  { icon: HelpCircle, label: "Start Quiz", color: "bg-accent", description: "Test yourself" },
  { icon: Layers, label: "Flashcards", color: "bg-warning", description: "Review cards" },
  { icon: Upload, label: "Upload", color: "bg-success", description: "Add materials" },
];

export function QuickActionsSection() {
  return (
    <section className="border border-border rounded-2xl p-5 bg-card">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center">
          <span className="text-primary text-xs font-bold">⚡</span>
        </div>
        <h2 className="font-display font-semibold text-lg">Quick Actions</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex items-center gap-3 p-3 border border-border rounded-xl hover:border-primary/50 hover:bg-muted/50 transition-all group"
          >
            <div className={`h-10 w-10 rounded-lg ${action.color} flex items-center justify-center flex-shrink-0`}>
              <action.icon className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium group-hover:text-primary transition-colors">{action.label}</p>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
