"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "magenta" | "teal" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "magenta", size = "md", className, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 cursor-pointer select-none whitespace-nowrap";

    const variants = {
      magenta:
        "bg-magenta text-white hover:bg-magenta-light active:scale-95 shadow-[0_0_20px_rgba(230,0,126,0.3)] hover:shadow-[0_0_35px_rgba(230,0,126,0.5)]",
      teal: "bg-teal text-night font-bold hover:bg-teal-light active:scale-95 shadow-[0_0_20px_rgba(0,194,203,0.3)]",
      ghost:
        "bg-transparent text-text-primary hover:text-white hover:bg-white/8 active:scale-95 border border-white/10",
      outline:
        "bg-transparent text-magenta border border-magenta hover:bg-magenta hover:text-white active:scale-95",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={cn(base, variants[variant], sizes[size], className)}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
