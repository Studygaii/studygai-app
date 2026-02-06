import { PropsWithChildren, useEffect, useRef } from "react";
import lottie from "lottie-web";

export function AuthLayout({ children }: PropsWithChildren) {
  const animationContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!animationContainer.current) return;

    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/upload.json",
    });

    return () => {
      anim?.destroy?.();
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
      </div>

      {/* Two Column Layout */}
      <div className="relative z-10 w-full flex items-center justify-center">
        {/* Left Side - Upload animation (hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
          <div className="relative w-[420px] h-[420px] flex items-center justify-center">
            {/* Soft blue glow behind animation */}
            <div className="absolute inset-8 rounded-[32px] bg-primary/10 blur-3xl" />
            <div
              ref={animationContainer}
              className="relative w-full h-full"
            />
          </div>
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
