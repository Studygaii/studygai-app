import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg bg-background border-border hover:bg-accent transition-all duration-300 z-50 overflow-hidden group"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <div className="relative h-6 w-6">
        <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 duration-300" />
        <Moon className="absolute top-0 left-0 h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 duration-300" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
