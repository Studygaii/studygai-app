import { PropsWithChildren, useEffect, useRef } from "react";
import lottie from "lottie-web";

export function AuthLayout({ children }: PropsWithChildren) {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animationContainer.current) {
      lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/upload.json",
      });
    }

    return () => {
      if (animationContainer.current) {
        lottie.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-transparent">
      {/* Background Gradients matching the design */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Blueish shape */}
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent blur-3xl opacity-40" />

        {/* Bottom Right Pinkish shape */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-destructive/5 via-transparent to-transparent blur-3xl opacity-30" />

        {/* Center White/Light glow - REMOVED to let background show */}
      </div>

      {/* Dynamic Abstract Background Image Simulation - REMOVED */}

      {/* Two Column Layout */}
      <div className="relative z-10 w-full flex items-center justify-center">
        {/* Left Side - Animation (hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
          <div
            ref={animationContainer}
            className="w-[400px] h-[400px]"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full max-w-[480px] px-4 lg:w-1/2">
          <div className="bg-card/80 backdrop-blur-xl rounded-[32px] p-8 md:p-10 shadow-2xl border border-border/50">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
