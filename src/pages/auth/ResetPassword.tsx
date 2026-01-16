import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoIcon } from "@/assets/icons/logo";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { PasswordInput } from "@/components/ui/password-input";

export default function ResetPassword() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center mb-6">
        <div className="mb-6 scale-110">
          <LogoIcon />
        </div>
        <h1 className="text-xl font-semibold text-foreground">Reset password</h1>
        <p className="text-sm text-muted-foreground text-center mt-3 px-4">
          Choose a new password for your account.
        </p>
      </div>

      <form className="space-y-4">
        <PasswordInput placeholder="New password" />
        <PasswordInput placeholder="Confirm new password" />

        <CustomButton
          type="submit"
          isLoading={false}
          className="mt-2"
        >
          Reset password
        </CustomButton>
      </form>

      <div className="text-center mt-8">
        <Link
          to="/auth/login"
          className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline transition-all"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to log in
        </Link>
      </div>
    </AuthLayout>
  );
}
