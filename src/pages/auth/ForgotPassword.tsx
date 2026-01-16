import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Input } from "@/components/ui/input";
import { LogoIcon } from "@/assets/icons/logo";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordValues } from "@/lib/validations/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function ForgotPassword() {
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    console.log(values)
    // Add real API call here if needed
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

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

      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    autoFocus
                    {...field}
                  />
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
            Send password reset link
          </CustomButton>
        </form>
      </Form>

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
