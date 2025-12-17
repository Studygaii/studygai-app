import { ChevronDown, ChevronUp, Plus, MoreHorizontal, Maximize2, GripVertical, CheckSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface Task {
  id: string;
  name: string;
  priority: "High" | "Low" | "Medium";
  dueDate: string;
  completed: boolean;
}

const inProgressTasks: Task[] = [
  { id: "1", name: "One-on-One Meeting", priority: "High", dueDate: "Today", completed: false },
  { id: "2", name: "Send a summary email to stakeholders", priority: "Low", dueDate: "3 days left", completed: false },
];

const todoTasks: Task[] = [
  { id: "3", name: "Review project timeline", priority: "Medium", dueDate: "5 days left", completed: false },
];

const upcomingTasks: Task[] = [
  { id: "4", name: "Quarterly review presentation", priority: "High", dueDate: "Next week", completed: false },
];

function TaskSection({
  title,
  tasks,
  variant
}: {
  title: string;
  tasks: Task[];
  variant: "progress" | "todo" | "upcoming"
}) {
  const [isOpen, setIsOpen] = useState(true);

  const badgeStyles = {
    progress: "bg-success/15 text-success",
    todo: "bg-secondary text-secondary-foreground",
    upcoming: "bg-info/15 text-info",
  };

  const badgeLabels = {
    progress: "IN PROGRESS",
    todo: "TO DO",
    upcoming: "UPCOMING",
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 mb-3 w-full text-left"
      >
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
        <span className={`status-badge ${badgeStyles[variant]}`}>
          {badgeLabels[variant]}
        </span>
        <span className="text-sm text-muted-foreground">• {tasks.length} task{tasks.length !== 1 ? 's' : ''}</span>
      </button>

      {isOpen && variant === "progress" && (
        <div className="ml-6">
          <div className="grid grid-cols-[1fr_80px_80px] gap-2 text-xs text-muted-foreground mb-2 px-2">
            <span>Name</span>
            <span className="text-center">Priority</span>
            <span className="text-right">Due date</span>
          </div>
          {tasks.map((task) => (
            <div key={task.id} className="grid grid-cols-[1fr_80px_80px] gap-2 items-center py-2.5 px-2 hover:bg-muted/50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Checkbox id={task.id} />
                <label htmlFor={task.id} className="text-sm cursor-pointer">{task.name}</label>
              </div>
              <span className={`text-xs font-medium text-center px-2.5 py-1 rounded-md ${task.priority === "High" ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground"
                }`}>
                {task.priority}
              </span>
              <span className={`text-xs text-right ${task.dueDate === "Today" ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                {task.dueDate}
              </span>
            </div>
          ))}
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-2 px-2 py-1">
            <Plus className="h-4 w-4" />
            Add task
          </button>
        </div>
      )}
    </div>
  );
}

export function MyTasksCard() {
  return (
    <Card className="rounded-sm shadow-none border border-border animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-grab" />
          <CheckSquare className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-semibold">My Tasks</CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
            <Plus className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
            <Maximize2 className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <TaskSection title="In Progress" tasks={inProgressTasks} variant="progress" />
        <TaskSection title="To Do" tasks={todoTasks} variant="todo" />
        <TaskSection title="Upcoming" tasks={upcomingTasks} variant="upcoming" />
      </CardContent>
    </Card>
  );
}
