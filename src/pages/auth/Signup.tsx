import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoIcon } from "@/assets/icons/logo";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "@/components/ui/custom-button";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupValues } from "@/lib/validations/auth";
import { authRequests } from "@/services";
import { useUserStore } from "@/store";
import { axiosErrorToast, toastSuccess } from "@/lib/utils/toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function Signup() {
  const navigate = useNavigate();
  const { setUser, setToken } = useUserStore();

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignupValues) => {
    try {
      const response = await authRequests.signup(values);
      const { user, token } = response.data.data;

      setUser({
        id: user.id,
        email: user.email,
        fullName: user.username,
        avatar: user.avatar,
      });
      setToken(token);

      toastSuccess("Account created successfully!");
      navigate("/");
    } catch (error) {
      axiosErrorToast(error);
    }
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center mb-8">
        <div className="mb-6 scale-125">
          <LogoIcon />
        </div>
        <h1 className="text-xl font-semibold text-foreground text-center">Get started with StudyGAI</h1>
        <p className="text-sm text-muted-foreground mt-2 text-center">Create your account to start learning smarter</p>
      </div>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Button 
            variant="outline" 
            className="shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] w-full h-12 rounded-md border-border bg-#1A1A2A hover:bg-[#1A1A2E] hover:text-white font-medium text-base gap-2" 
            type="button"
            onClick={() => authRequests.initiateGoogleAuth()}
          >
            <span>Sign up with Google</span>
            <img src="/icons/google.svg" alt="google" width={25} height={25} />
          </Button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/60"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground/60">Or</span>
            </div>
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <CustomButton
            type="submit"
            isLoading={form.formState.isSubmitting}
            className="mt-2"
          >
            Create account
          </CustomButton>
        </form>
      </Form>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-semibold text-foreground hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
