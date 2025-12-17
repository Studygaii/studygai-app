import { Bell, ChevronDown, ChevronUp, Flag, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const reminders = [
  { id: "1", text: "Assess any new risks identified in the morning meeting.", completed: false },
  { id: "2", text: "Outline key points for tomorrow's stand-up meeting.", completed: false },
];

export function RemindersCard() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="rounded-sm shadow-none border border-border animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-semibold">Reminders</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 mb-3 w-full text-left"
        >
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-sm font-medium">Today</span>
          <span className="text-sm text-muted-foreground">• {reminders.length}</span>
        </button>

        {isOpen && (
          <div className="space-y-2">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-start gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors group"
              >
                <Checkbox id={reminder.id} className="mt-0.5" />
                <label htmlFor={reminder.id} className="flex-1 text-sm cursor-pointer leading-relaxed">
                  {reminder.text}
                </label>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 hover:bg-muted rounded transition-colors">
                    <Flag className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button className="p-1 hover:bg-muted rounded transition-colors">
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
