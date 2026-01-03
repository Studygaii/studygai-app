import { PropsWithChildren } from "react";

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#F2F4F7]">
      {/* Background Gradients matching the design */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Blueish shape */}
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#004EEB]/20 via-transparent to-transparent blur-3xl opacity-60" />

        {/* Bottom Right Pinkish shape */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#E93A7D]/10 via-transparent to-transparent blur-3xl opacity-60" />

        {/* Center White/Light glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/40 blur-[100px] pointer-events-none" />
      </div>

      {/* Dynamic Abstract Background Image Simulation (CSS-only approximation of the provided image) */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#1E40AF]/10 to-[#DB2777]/10" />
        {/* Add simplified waves/curves if needed, but gradient mesh is usually enough for the vibe */}
      </div>

      <div className="relative z-10 w-full max-w-[480px] px-4">
        <div className="bg-[#F7F7F8] backdrop-blur-xl rounded-[32px] p-8 md:p-10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-white/50">
          {children}
        </div>
      </div>
    </div>
  );
}
