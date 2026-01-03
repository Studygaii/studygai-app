import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { LogoIcon } from "@/assets/icons/logo";
import { Link } from "react-router-dom";
import { MailCheck } from "lucide-react";

export default function OtpSent() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center mb-6">
        <div className="mb-6 h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center">
          <MailCheck className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-xl font-semibold text-foreground">Check your email</h1>
        <p className="text-sm text-muted-foreground text-center mt-3 px-4 leading-relaxed">
          We've sent a temporary six-digit code to <span className="font-medium text-foreground">courtney@example.com</span>
        </p>
      </div>

      <div className="space-y-4">
        <Link to="/auth/verify-otp">
          <Button className="w-full h-12 rounded-xl bg-[#1A1A2E] hover:bg-[#1A1A2E]/90 text-white font-medium text-base">
            Enter code
          </Button>
        </Link>

        <Button variant="ghost" className="w-full h-12 rounded-xl font-medium text-muted-foreground hover:text-foreground">
          Click to resend
        </Button>
      </div>

      <div className="text-center mt-6">
        <Link to="/auth/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Back to log in
        </Link>
      </div>
    </AuthLayout>
  );
}
