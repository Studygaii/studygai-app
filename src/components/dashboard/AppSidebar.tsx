import { useState } from "react";
import { LayoutDashboard, BookOpen, HelpCircle, Layers, Settings, ChevronDown, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BookOpen, label: "Courses" },
  { icon: HelpCircle, label: "Quizzes" },
  { icon: Layers, label: "Flashcards" },
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

      {/* Logo */}
      <div className={cn(
        "flex items-center gap-2 mb-8",
        collapsed ? "justify-center px-0" : "px-2"
      )}>
        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-display font-bold text-xl text-foreground">StudyAI</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-hidden">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 rounded-xl text-sm transition-all",
              collapsed ? "justify-center px-3 py-3" : "px-3 py-2.5",
              item.active
                ? "bg-secondary text-secondary-foreground font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Settings */}
      <button 
        className={cn(
          "flex items-center gap-3 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all mb-4",
          collapsed ? "justify-center px-3 py-3" : "px-3 py-2.5"
        )}
        title={collapsed ? "Settings" : undefined}
      >
        <Settings className="h-5 w-5 flex-shrink-0" />
        {!collapsed && <span>Settings</span>}
      </button>

      {/* Ad Space */}
      {!collapsed && (
        <div className="border-2 border-dashed border-border rounded-xl p-4 mb-4 flex items-center justify-center min-h-[100px]">
          <span className="text-muted-foreground text-sm font-medium">AD</span>
        </div>
      )}

      {/* User Profile */}
      <div className={cn(
        "flex items-center gap-3 py-3 border-t border-border",
        collapsed ? "justify-center px-0" : "px-2"
      )}>
        <Avatar className="h-9 w-9 flex-shrink-0">
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
          <AvatarFallback>BK</AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-medium text-sm text-foreground truncate">Basil K.</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
            </div>
            <span className="text-xs text-muted-foreground">Student</span>
          </div>
        )}
      </div>
    </aside>
  );
}
