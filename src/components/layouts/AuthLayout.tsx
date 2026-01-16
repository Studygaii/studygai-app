import { PropsWithChildren } from "react";

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Gradients matching the design */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Blueish shape */}
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent blur-3xl opacity-60" />

        {/* Bottom Right Pinkish shape */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-destructive/10 via-transparent to-transparent blur-3xl opacity-60" />

        {/* Center White/Light glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-background/40 blur-[100px] pointer-events-none" />
      </div>

      {/* Dynamic Abstract Background Image Simulation */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply dark:mix-blend-overlay pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-destructive/10" />
      </div>

      <div className="relative z-10 w-full max-w-[480px] px-4">
        <div className="bg-card/80 backdrop-blur-xl rounded-[32px] p-8 md:p-10 shadow-2xl border border-border/50">
          {children}
        </div>
      </div>
    </div>
  );
}
