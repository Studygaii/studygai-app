import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogoIcon } from "@/assets/icons/logo";

const Index = () => {
  const animationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!animationRef.current) return;

    const anim = lottie.loadAnimation({
      container: animationRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/group.json",
    });

    return () => {
      anim?.destroy?.();
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent blur-3xl opacity-60" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/15 via-transparent to-transparent blur-3xl opacity-60" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-4 md:px-8 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Left: copy */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <LogoIcon />
            <span className="font-semibold tracking-tight text-sm md:text-base">
              StudyGAI
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Learn together with{" "}
            <span className="gradient-text">AI study groups</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl">
            Upload your documents, parse them into smart context, then{" "}
            <span className="font-semibold">start interacting</span> with
            StudyGAI in real-time group chats.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/auth/signup">
              <Button size="lg" className="shadow-lg">
                Get started
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button variant="outline" size="lg">
                I already have an account
              </Button>
            </Link>
          </div>

          {/* Name badges matching animation story */}
          <div className="mt-4 flex flex-wrap gap-3 text-xs md:text-sm">
            <div className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              0XNEN · Host
            </div>
            <div className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              VASMAN · Study partner
            </div>
            <div className="px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-500 border border-sky-500/30">
              StudyGAI · AI assistant
            </div>
          </div>
        </div>

        {/* Right: group animation */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="relative w-full max-w-[420px] aspect-square">
            <div className="absolute inset-6 rounded-[32px] bg-primary/10 dark:bg-primary/20 blur-2xl opacity-70" />
            <div
              ref={animationRef}
              className="relative w-full h-full"
              aria-label="Study group animation"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
