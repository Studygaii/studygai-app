import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, MailCheck } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";

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
          <CustomButton
            type="submit"
            isLoading={false}
            className="mt-2"
          >
            Enter code
          </CustomButton>
        </Link>

        <Button
          type="submit"
          variant="outline"
          className="mt-2 w-full h-12 rounded-xl"
        >
          Click to resend
        </Button>
      </div>

      <div className="text-center mt-6">
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
