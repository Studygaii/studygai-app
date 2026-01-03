import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoIcon } from "@/assets/icons/logo";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center mb-8">
        <div className="mb-6 scale-125">
          <LogoIcon />
        </div>
        <h1 className="text-xl font-semibold text-foreground text-center">Get started with StudyAI</h1>
        <p className="text-sm text-muted-foreground mt-2 text-center">Create your account to start learning smarter</p>
      </div>

      <form className="space-y-4">
        <Input
          type="text"
          placeholder="Full Name"
          className="h-12 rounded-xl border-border focus-visible:ring-primary/30 bg-white/50 transition-all pl-4"
        />
        <Input
          type="email"
          placeholder="Email"
          className="h-12 rounded-xl border-border focus-visible:ring-primary/30 bg-white/50 transition-all pl-4"
        />
        <Input
          type="password"
          placeholder="Password"
          className="h-12 rounded-xl border-border focus-visible:ring-primary/30 bg-white/50 transition-all pl-4"
        />

        <Button className="w-full h-12 rounded-xl bg-[#1A1A2E] hover:bg-[#1A1A2E]/90 text-white font-medium text-base mt-2">
          Create account
        </Button>
      </form>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-semibold text-foreground hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
