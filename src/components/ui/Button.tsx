import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
};

export function Button({
  className,
  variant = "primary",
  fullWidth,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-teal-800 text-white hover:bg-teal-900",
        variant === "secondary" &&
          "border border-stone-300 bg-white text-stone-800 hover:bg-stone-50",
        variant === "ghost" && "text-teal-800 hover:bg-teal-50",
        fullWidth && "w-full",
        className,
      )}
      {...props}
    />
  );
}
