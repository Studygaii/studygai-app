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
import { CustomButton } from "@/components/ui/custom-button";

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
            <InputOTPSlot index={0} className="rounded-md" />
            <InputOTPSlot index={1} className="rounded-md" />
            <InputOTPSlot index={2} className="rounded-md" />
            <InputOTPSlot index={3} className="rounded-md" />
            <InputOTPSlot index={4} className="rounded-md" />
            <InputOTPSlot index={5} className="rounded-md" />
          </InputOTPGroup>
        </InputOTP>

        <CustomButton
          type="submit"
          isLoading={false}
          className="mt-2"
        >
          Verify
        </CustomButton>
      </form>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground mb-4">
          Didn't receive the email? <button className="font-semibold text-foreground hover:underline">Click to resend</button>
        </p>

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
