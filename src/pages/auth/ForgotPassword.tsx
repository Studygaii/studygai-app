import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoIcon } from "@/assets/icons/logo";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function ForgotPassword() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center mb-6">
        <div className="mb-6 scale-110">
          <LogoIcon />
        </div>
        <h1 className="text-xl font-semibold text-foreground">Forgot password?</h1>
        <p className="text-sm text-muted-foreground text-center mt-3 px-4 leading-relaxed">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form className="space-y-6">
        <Input
          type="email"
          placeholder="Email"
          className="h-12 rounded-xl border-primary focus-visible:ring-primary/30 bg-white/50 transition-all pl-4 text-foreground ring-offset-0"
          autoFocus
        />

        <Button className="w-full h-12 rounded-xl bg-[#1A1A2E] hover:bg-[#1A1A2E]/90 text-white font-medium text-base">
          Send password reset link
        </Button>
      </form>

      <div className="text-center mt-8">
        <Link to="/auth/login" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Go back
        </Link>
      </div>
    </AuthLayout>
  );
}
