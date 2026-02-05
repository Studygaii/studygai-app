import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg transition-all duration-300 z-50 overflow-hidden group flex items-center justify-center ${
        theme === "dark"
          ? "bg-blue-950/50 border-2 border-blue-400 hover:shadow-lg hover:border-blue-300 hover:box-shadow-[0_0_20px_rgba(96,165,250,0.8)]"
          : "bg-background/90 border border-border hover:bg-accent/20"
      }`}
      style={
        theme === "dark"
          ? {
              boxShadow: "0 0 15px rgba(96, 165, 250, 0.6), inset 0 0 10px rgba(96, 165, 250, 0.1)",
            }
          : {}
      }
    >
      <div className="relative h-6 w-6 flex items-center justify-center">
        <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 duration-300 text-yellow-500 absolute" />
        <Moon
          className={`h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 duration-300 absolute ${
            theme === "dark" ? "text-blue-300" : ""
          }`}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
