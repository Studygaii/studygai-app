import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoIcon } from "@/assets/icons/logo";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export default function ConfirmOtp() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center mb-8">
        <div className="mb-6 scale-110">
          <LogoIcon />
        </div>
        <h1 className="text-xl font-semibold text-foreground">Verify your email</h1>
        <p className="text-sm text-muted-foreground text-center mt-3 px-4">
          Enter the code sent to your email.
        </p>
      </div>

      <form className="flex flex-col items-center space-y-6">
        <InputOTP maxLength={6}>
          <InputOTPGroup className="gap-2">
            <InputOTPSlot index={0} className="rounded-lg border-border" />
            <InputOTPSlot index={1} className="rounded-lg border-border" />
            <InputOTPSlot index={2} className="rounded-lg border-border" />
            <InputOTPSlot index={3} className="rounded-lg border-border" />
            <InputOTPSlot index={4} className="rounded-lg border-border" />
            <InputOTPSlot index={5} className="rounded-lg border-border" />
          </InputOTPGroup>
        </InputOTP>

        <Button className="w-full h-12 rounded-xl bg-[#1A1A2E] hover:bg-[#1A1A2E]/90 text-white font-medium text-base">
          Verify
        </Button>
      </form>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground mb-4">
          Didn't receive the email? <button className="font-semibold text-foreground hover:underline">Click to resend</button>
        </p>

        <Link to="/auth/login" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Back to log in
        </Link>
      </div>
    </AuthLayout>
  );
}
