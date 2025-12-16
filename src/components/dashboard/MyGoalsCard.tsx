import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const goals = [
  { 
    name: "Check Emails and Messages", 
    project: "Product launch", 
    category: "My Projects",
    progress: 73,
    color: "bg-accent"
  },
  { 
    name: "Prepare a brief status update to the client", 
    project: "Product launch", 
    category: "My Projects",
    progress: 11,
    color: "bg-warning"
  },
  { 
    name: "Update project documentation", 
    project: "Team brainstorm", 
    category: "My Projects",
    progress: 63,
    color: "bg-success"
  },
];

export function MyGoalsCard() {
  return (
    <Card className="card-shadow animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-semibold">My Goals</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{goal.name}</p>
                <p className="text-xs text-muted-foreground">{goal.project} • {goal.category}</p>
              </div>
              <span className="text-sm font-semibold">{goal.progress}%</span>
            </div>
            <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className={`absolute left-0 top-0 h-full ${goal.color} rounded-full transition-all duration-500`}
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
