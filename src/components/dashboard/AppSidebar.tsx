import { Home, Sparkles, Settings, Plus, ChevronDown, ChevronLeft, ChevronRight, BookOpen, Clock10Icon, Bookmark, BookType, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LogoIcon } from "@/assets/icons/logo";
import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "@/store/user.store";

const navItems: { icon: any; label: string; path: string }[] = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: BookOpen, label: "My Courses", path: "/dashboard" },
  { icon: Clock10Icon, label: "Quizzes", path: "/quizzes" },
  { icon: Bookmark, label: "Flashcards", path: "/flashcards" },
  { icon: BookType, label: "My Exams", path: "/exams" },
  { icon: MessageSquare, label: "Group Chat", path: "/groupchats" },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const location = useLocation();
  const { user } = useUserStore();
  
  // Extract initials from user's full name or email
  const getInitials = () => {
    if (user?.fullName) {
      return user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return user?.email?.charAt(0).toUpperCase() || "U";
  };
  return (
    <aside className={cn(
      "bg-card h-screen flex flex-col transition-all duration-300 relative flex-shrink-0 fixed md:static z-40 md:z-auto",
      collapsed ? "w-20 p-3" : "w-64 p-4",
      collapsed && "-translate-x-full md:translate-x-0"
    )}>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 h-6 w-6 rounded-full bg-card border border-border shadow-sm flex items-center justify-center hover:bg-muted transition-colors z-10 hidden md:flex"
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5 text-muted-foreground" />
        )}
      </button>

      {/* Mobile Close Button */}
      <button
        onClick={onToggle}
        className="absolute top-4 right-4 h-6 w-6 rounded-full bg-background border border-border shadow-sm flex items-center justify-center hover:bg-muted transition-colors z-10 md:hidden"
      >
        <ChevronLeft className="h-3.5 w-3.5 text-muted-foreground" />
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
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === "/dashboard" && location.pathname.startsWith("/dashboard"));
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "w-full flex items-center gap-3 rounded-md text-sm transition-all",
                collapsed ? "justify-center px-3 py-3" : "px-3 py-2.5",
                isActive
                  ? "bg-secondary text-secondary-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
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
            <span className="font-semibold text-sm">StudyGAI</span>
          </div>
          <p className="text-xs opacity-90 mb-3 leading-relaxed">
            Upload documents, generate quizzes & flashcards, and chat with AI
          </p>
          <Link to="/dashboard">
            <button className="w-full bg-card text-primary font-medium text-sm py-2 rounded-md hover:bg-card/90 transition-colors flex items-center justify-center gap-1.5">
              <Plus className="h-4 w-4" />
              New course
            </button>
          </Link>
        </div>
      )}


      {/* User Profile */}
      <div className={cn(
        "flex items-center gap-3 py-3 mb-2 w-full",
        collapsed ? "justify-center px-0" : "px-2"
      )}>
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm text-foreground truncate">{user?.fullName || user?.email || "User"}</span>
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
