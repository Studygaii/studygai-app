import { Plus, ChevronDown, Rocket, Users, Zap, Megaphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const projects = [
  { 
    name: "Create new project", 
    icon: Plus,
    isCreate: true 
  },
  { 
    name: "Product launch", 
    tasks: 6, 
    teammates: 12,
    icon: Rocket,
    iconColor: "text-primary",
    iconBg: "bg-primary/10"
  },
  { 
    name: "Team brainstorm", 
    tasks: 2, 
    teammates: 32,
    icon: Users,
    iconColor: "text-accent",
    iconBg: "bg-accent/10"
  },
  { 
    name: "Branding launch", 
    tasks: 4, 
    teammates: 9,
    icon: Megaphone,
    iconColor: "text-info",
    iconBg: "bg-info/10"
  },
];

export function ProjectsCard() {
  return (
    <Card className="card-shadow animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-secondary flex items-center justify-center">
              <span className="text-xs">📁</span>
            </div>
            <CardTitle className="text-base font-semibold">Projects</CardTitle>
          </div>
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            Recents
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {projects.map((project, index) => (
            <button
              key={project.name}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                project.isCreate 
                  ? "border-2 border-dashed border-border hover:border-primary hover:bg-secondary/50" 
                  : "hover:bg-muted"
              }`}
            >
              {project.isCreate ? (
                <>
                  <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Plus className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{project.name}</span>
                </>
              ) : (
                <>
                  <div className={`h-10 w-10 rounded-xl ${project.iconBg} flex items-center justify-center`}>
                    <project.icon className={`h-5 w-5 ${project.iconColor}`} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">{project.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {project.tasks} tasks • {project.teammates} teammates
                    </p>
                  </div>
                </>
              )}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
