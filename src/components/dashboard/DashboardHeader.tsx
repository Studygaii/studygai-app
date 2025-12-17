import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'long', day: 'numeric' };
  const dateString = today.toLocaleDateString('en-US', options);

  return (
    <header className="mb-6 pt-12">
      <p className="text-sm text-muted-foreground mb-1">{dateString}</p>
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Hello, Courtney</h1>
          <p className="font-display font-semibold text-muted-foreground">How can I help you today?</p>
        </div>
        <div className="flex flex-wrap gap-2 ml-auto">
          <Button variant="ai" size="sm" className="gap-1.5">
            <Sparkles className="h-4 w-4" />
            Ask AI
          </Button>
          <Button variant="outline" size="sm">Get tasks updates</Button>
          <Button variant="outline" size="sm">Create workspace</Button>
          <Button variant="outline" size="sm">Connect apps</Button>
        </div>
      </div>
    </header>
  );
}
