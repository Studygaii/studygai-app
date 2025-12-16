import { ChevronLeft, ChevronRight, ChevronDown, MoreHorizontal, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const days = [
  { day: "Fri", date: 4 },
  { day: "Sat", date: 5 },
  { day: "Sun", date: 6 },
  { day: "Mon", date: 7, active: true },
  { day: "Tue", date: 8 },
  { day: "Wed", date: 9 },
  { day: "Thu", date: 10 },
];

const attendees = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
];

export function CalendarCard() {
  return (
    <Card className="card-shadow animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-semibold">Calendar</CardTitle>
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground ml-1">
            July
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Date Picker */}
        <div className="flex items-center justify-between mb-4">
          <button className="p-1 hover:bg-muted rounded-lg transition-colors">
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
          <div className="flex gap-1">
            {days.map((d) => (
              <button
                key={d.date}
                className={`flex flex-col items-center py-2 px-2.5 rounded-xl transition-all ${
                  d.active
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-xs">{d.day}</span>
                <span className="text-sm font-semibold">{d.date.toString().padStart(2, '0')}</span>
              </button>
            ))}
          </div>
          <button className="p-1 hover:bg-muted rounded-lg transition-colors">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Meeting Card */}
        <div className="bg-secondary/50 rounded-xl p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-semibold text-sm mb-1">Meeting with VP</h4>
              <p className="text-xs text-muted-foreground">Today • 10:00 - 11:00 am</p>
            </div>
            <button className="p-1 hover:bg-muted rounded-lg transition-colors">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-card px-3 py-1.5 rounded-lg">
              <div className="h-4 w-4 rounded bg-success flex items-center justify-center">
                <span className="text-[10px] text-success-foreground font-bold">G</span>
              </div>
              <span className="text-xs font-medium">Google Meet</span>
            </div>
            <div className="flex -space-x-2">
              {attendees.map((src, i) => (
                <Avatar key={i} className="h-7 w-7 border-2 border-card">
                  <AvatarImage src={src} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              ))}
              <div className="h-7 w-7 rounded-full bg-success text-success-foreground text-xs font-semibold flex items-center justify-center border-2 border-card">
                +2
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
