import * as React from "react";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";
import ButtonSpinner from "@/assets/icons/Spinner";
import RightArrowIcon from "@/assets/icons/RightArrow";

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean;
  showArrow?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, isLoading, showArrow = true, children, disabled, ...props }, ref) => {
    return (
      <Button
        className={cn(
          "group relative overflow-hidden transition-all duration-300 w-full h-12 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium text-base",
          (showArrow || isLoading) && "pr-14",
          className
        )}
        disabled={isLoading || disabled}
        ref={ref}
        {...props}
      >
        <span className="inline-flex items-center transition-all duration-300">
          {children}
        </span>

        {(showArrow || isLoading) && (
          <div className="flex items-center justify-center absolute right-1 bg-white rounded-md w-11 h-9 overflow-hidden">
            <div className="relative flex items-center justify-center w-full h-full">
              {isLoading ? (
                <ButtonSpinner />
              ) : (
                <>
                  <RightArrowIcon className="text-black absolute transition-all duration-300 transform group-hover:translate-x-10" />
                  <RightArrowIcon className="text-black absolute transition-all duration-300 transform -translate-x-10 group-hover:translate-x-0" />
                </>
              )}
            </div>
          </div>
        )}
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export { CustomButton };
