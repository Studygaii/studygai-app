import { Bell } from "lucide-react";

export function FloatingActionButton() {
  return (
    <button className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center z-50">
      <Bell className="h-5 w-5" />
    </button>
  );
}
