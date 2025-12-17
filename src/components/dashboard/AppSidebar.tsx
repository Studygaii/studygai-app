import { Home, Sparkles, Settings, Plus, ChevronDown, ChevronLeft, ChevronRight, BookOpen, Clock10Icon, Bookmark, BookType } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LogoIcon } from "@/assets/icons/logo";

const navItems: { icon: any; label: string; active?: boolean; badge?: boolean }[] = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: BookOpen, label: "My Courses" },
  { icon: Clock10Icon, label: "Quizzes" },
  { icon: Bookmark, label: "Flashcards" },
  { icon: BookType, label: "My Exams" },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  return (
    <aside className={cn(
      "bg-card h-screen flex flex-col transition-all duration-300 relative flex-shrink-0",
      collapsed ? "w-20 p-3" : "w-64 p-4"
    )}>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 h-6 w-6 rounded-full bg-card border border-border shadow-sm flex items-center justify-center hover:bg-muted transition-colors z-10"
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5 text-muted-foreground" />
        )}
      </button>

      {/* User Profile */}
      <div className={cn(
        "flex items-center gap-3 py-3 mb-2",
        collapsed ? "justify-center px-0" : "px-2"
      )}>
        <Avatar className="h-10 w-10 flex-shrink-0">
          <LogoIcon />
        </Avatar>
        {!collapsed && (
          <div className="flex-1 min-w-0 text-foreground font-extrabold text-xl font-display">
            StudyGAI
          </div>
        )}
      </div>



      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-hidden mt-5">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 rounded-md text-sm transition-all",
              collapsed ? "justify-center px-3 py-3" : "px-3 py-2.5",
              item.active
                ? "bg-secondary text-secondary-foreground font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
            {!collapsed && item.badge && (
              <span className="ml-auto text-xs">✨</span>
            )}
          </button>
        ))}
        {/* Settings */}
        <button
          className={cn(
            "w-full flex items-center gap-3 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all mb-3",
            collapsed ? "justify-center px-3 py-3" : "px-3 py-2.5"
          )}
          title={collapsed ? "Settings" : undefined}
        >
          <Settings className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </button>

      </nav>

      {/* Promo Card */}
      {!collapsed && (
        <div className="bg-primary rounded-xl p-4 text-primary-foreground">
          <div className="flex items-center gap-1 mb-2">
            <Sparkles className="h-4 w-4" />
            <span className="font-semibold text-sm">prodify</span>
          </div>
          <p className="text-xs opacity-90 mb-3 leading-relaxed">
            New members will gain access to public Spaces, Docs and Dashboards
          </p>
          <button className="w-full bg-card text-primary font-medium text-sm py-2 rounded-md hover:bg-card/90 transition-colors flex items-center justify-center gap-1.5">
            <Plus className="h-4 w-4" />
            Invite people
          </button>
        </div>
      )}


      {/* User Profile */}
      <div className={cn(
        "flex items-center gap-3 py-3 mb-2 w-full",
        collapsed ? "justify-center px-0" : "px-2"
      )}>
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" />
          <AvatarFallback>CH</AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm text-foreground truncate">Courtney Henry</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-success"></span>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
