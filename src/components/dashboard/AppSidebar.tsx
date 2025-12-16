import { Home, Sparkles, CheckSquare, Inbox, Calendar, BarChart3, Settings, Plus, ChevronDown, Rocket, Users, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Sparkles, label: "Prodify AI", badge: true },
  { icon: CheckSquare, label: "My tasks" },
  { icon: Inbox, label: "Inbox" },
  { icon: Calendar, label: "Calendar" },
  { icon: BarChart3, label: "Reports & Analytics" },
];

const projects = [
  { name: "Product launch", color: "bg-primary" },
  { name: "Team brainstorm", color: "bg-accent" },
  { name: "Branding launch", color: "bg-info" },
];

export function AppSidebar() {
  return (
    <aside className="w-64 bg-card rounded-2xl card-shadow p-4 flex flex-col h-[calc(100vh-2rem)] my-4 ml-4">
      {/* User Profile */}
      <div className="flex items-center gap-3 px-2 py-3 mb-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" />
          <AvatarFallback>CH</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm text-foreground">Courtney Henry</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-success"></span>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
              item.active
                ? "bg-secondary text-secondary-foreground font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-auto text-xs">✨</span>
            )}
          </button>
        ))}

        {/* My Projects Section */}
        <div className="pt-4">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-sm font-medium text-foreground">My Projects</span>
            <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
              <Plus className="h-3.5 w-3.5" />
              Add
            </button>
          </div>
          <div className="space-y-1">
            {projects.map((project) => (
              <button
                key={project.name}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
              >
                <span className={`h-2.5 w-2.5 rounded-sm ${project.color}`}></span>
                <span>{project.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Settings */}
      <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all mb-3">
        <Settings className="h-5 w-5" />
        <span>Settings</span>
      </button>

      {/* Promo Card */}
      <div className="bg-primary rounded-xl p-4 text-primary-foreground">
        <div className="flex items-center gap-1 mb-2">
          <Sparkles className="h-4 w-4" />
          <span className="font-semibold text-sm">prodify</span>
        </div>
        <p className="text-xs opacity-90 mb-3 leading-relaxed">
          New members will gain access to public Spaces, Docs and Dashboards
        </p>
        <button className="w-full bg-card text-primary font-medium text-sm py-2 rounded-lg hover:bg-card/90 transition-colors flex items-center justify-center gap-1.5">
          <Plus className="h-4 w-4" />
          Invite people
        </button>
      </div>
    </aside>
  );
}
