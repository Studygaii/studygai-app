import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Input } from "@/components/ui/input";
import { LogoIcon } from "@/assets/icons/logo";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";

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
          autoFocus
        />

        <CustomButton
          type="submit"
          isLoading={false}
          className="mt-2"
        >
          Send password reset link
        </CustomButton>
      </form>

      <div className="text-center mt-8">
        <Link
          to="/auth/login"
          className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline transition-all"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Go back
        </Link>
      </div>
    </AuthLayout>
  );
}
