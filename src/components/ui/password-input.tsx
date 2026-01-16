import * as React from "react";
import { Input } from "@/components/ui/input";
import { EyeIcon } from "lucide-react";
import EyeSlashIcon from "@/assets/icons/EyeIconSlash";
import { cn } from "@/lib/utils";

export type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative group">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {showPassword ? (
            <EyeIcon className="h-5 w-5" />
          ) : (
            <EyeSlashIcon />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
