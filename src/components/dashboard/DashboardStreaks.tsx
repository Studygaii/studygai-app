import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Star, Trophy, Target } from "lucide-react";

export function DashboardStreaks() {
  return (
    <Card className="rounded-2xl shadow-sm border border-border animate-fade-in relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />

      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Flame className="h-4 w-4 text-orange-500" />
          </div>
          <CardTitle className="text-lg font-semibold">Streaks</CardTitle>
        </div>
        <div className="flex items-center gap-1 bg-orange-500/10 px-2 py-1 rounded-md">
          <Flame className="h-3.5 w-3.5 text-orange-500 fill-orange-500 animate-pulse" />
          <span className="text-xs font-bold text-orange-600">12 Days</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-full">
              <Trophy className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Best Streak</p>
              <p className="text-sm font-bold">24 Days</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-full">
              <Target className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Completion Rate</p>
              <p className="text-sm font-bold">85%</p>
            </div>
          </div>
        </div>

        <div className="bg-secondary/30 rounded-xl p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium">Weekly Goal</span>
            <span className="text-xs text-muted-foreground">4/5 Days</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <div
                key={day}
                className={`h-1.5 flex-1 rounded-full ${day <= 4 ? "bg-orange-500" : "bg-muted"}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
