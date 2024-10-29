import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap  text-base font-semibold ring-offset-white transition-colors",
  {
    variants: {
      variant: {
        default: "bg-accent text-primary hover:bg-accent-hover",
        primary: "bg-primary text-white",
        outline: "border border-accent bg-transparent text-accent hover:bg-accent hover:text-primary"
      },
      disabled: {
        true: "cursor-not-allowed opacity-50", // Generic disabled styling (optional)
      },
      size: {
        default: "h-[44px] px-6",
        sm: "h-[48px] px-6",
        lg: "h-[56px] px-8 text-sm uppercase tracking-[2px]",

      },
 
    },
    compoundVariants: [
      {
        variant: "outline",
        disabled: true,
        className: "border-red-500 text-red-500 bg-transparent", // Specific outline variant styling when disabled
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof buttonVariants> {
  disabled?: boolean; // Explicitly declare compatible type
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, disabled, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, disabled,  size }), className )}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
