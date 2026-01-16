import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoIcon } from "@/assets/icons/logo";
import { Link } from "react-router-dom";
import { CustomButton } from "@/components/ui/custom-button";

export default function Signup() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center mb-8">
        <div className="mb-6 scale-125">
          <LogoIcon />
        </div>
        <h1 className="text-xl font-semibold text-foreground text-center">Get started with StudyGAI</h1>
        <p className="text-sm text-muted-foreground mt-2 text-center">Create your account to start learning smarter</p>
      </div>

      <form className="space-y-4">

        <Button variant="outline" className="shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] w-full h-12 rounded-md border-border bg-white hover:bg-[#1A1A2E] hover:text-white font-medium text-base gap-2" type="button">
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

        <Input
          type="text"
          placeholder="Full Name"
        />
        <Input
          type="email"
          placeholder="Email"
        />
        <Input
          type="password"
          placeholder="Password"
        />

        <CustomButton
          type="submit"
          isLoading={false}
          className="mt-2"
        >
          Create account
        </CustomButton>
      </form>

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
