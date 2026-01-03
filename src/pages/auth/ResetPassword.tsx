import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoIcon } from "@/assets/icons/logo";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

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
        <Input
          type="password"
          placeholder="New password"
          className="h-12 rounded-xl border-border focus-visible:ring-primary/30 bg-white/50 transition-all pl-4"
        />
        <Input
          type="password"
          placeholder="Confirm new password"
          className="h-12 rounded-xl border-border focus-visible:ring-primary/30 bg-white/50 transition-all pl-4"
        />

        <Button className="w-full h-12 rounded-xl bg-[#1A1A2E] hover:bg-[#1A1A2E]/90 text-white font-medium text-base mt-2">
          Reset password
        </Button>
      </form>

      <div className="text-center mt-8">
        <Link to="/auth/login" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Back to log in
        </Link>
      </div>
    </AuthLayout>
  );
}
