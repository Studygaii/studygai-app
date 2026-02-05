import { Sparkles, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user.store";

export function DashboardHeader({ onSidebarToggle }: { onSidebarToggle?: () => void }) {
  const { user } = useUserStore();
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'long', day: 'numeric' };
  const dateString = today.toLocaleDateString('en-US', options);

  return (
    <header className="mb-6 pt-6 md:pt-12">
      <p className="text-xs md:text-sm text-muted-foreground mb-1">{dateString}</p>
      <div className="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-4">
        <button
          onClick={onSidebarToggle}
          className="md:hidden p-2 hover:bg-muted rounded-md transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Hello, {user?.fullName || "User"}</h1>
          <p className="font-display font-semibold text-muted-foreground text-sm md:text-base">What do you wanna study today?</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto md:ml-auto">
          <Button variant="ai" size="sm" className="gap-1.5 text-xs md:text-sm">
            <Sparkles className="h-4 w-4" />
            Ask AI
          </Button>
          <Button variant="outline" size="sm" className="text-xs md:text-sm hidden sm:inline-flex">Get tasks updates</Button>
          <Button variant="outline" size="sm" className="text-xs md:text-sm hidden sm:inline-flex">Create workspace</Button>
          <Button variant="outline" size="sm" className="text-xs md:text-sm hidden sm:inline-flex">Connect apps</Button>
        </div>
      </div>
    </header>
  );
}
