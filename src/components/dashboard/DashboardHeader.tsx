import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function DashboardHeader() {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
  const dateString = today.toLocaleDateString('en-US', options);

  return (
    <header className="mb-6">
      <div className="flex items-start justify-between gap-4 mb-1">
        <p className="text-sm text-muted-foreground">{dateString}</p>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-9 bg-card border-border"
          />
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Hello, Basil</h1>
        <p className="text-muted-foreground">Ready to continue your learning journey today?</p>
      </div>
    </header>
  );
}
