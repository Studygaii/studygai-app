import { AuthLayout } from "@/components/layouts/AuthLayout";
import { LogoIcon } from "@/assets/icons/logo";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { CustomButton } from "@/components/ui/custom-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, OtpValues } from "@/lib/validations/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function ConfirmOtp() {
  const form = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: OtpValues) => {
    console.log(values)
    // Add real API call here if needed
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

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

      <Form {...form}>
        <form className="flex flex-col items-center space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={0} className="rounded-md" />
                      <InputOTPSlot index={1} className="rounded-md" />
                      <InputOTPSlot index={2} className="rounded-md" />
                      <InputOTPSlot index={3} className="rounded-md" />
                      <InputOTPSlot index={4} className="rounded-md" />
                      <InputOTPSlot index={5} className="rounded-md" />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CustomButton
            type="submit"
            isLoading={form.formState.isSubmitting}
            className="mt-2"
          >
            Verify
          </CustomButton>
        </form>
      </Form>

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
