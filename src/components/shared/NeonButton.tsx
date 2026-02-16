"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NeonButtonProps = React.ComponentProps<typeof Button> & {
  glow?: boolean;
};

export function NeonButton({
  children,
  className,
  glow = true,
  ...props
}: NeonButtonProps) {
  return (
    <Button
      {...props}
      className={cn(
        // shape
        " rounded-full  font-semibold",

        // colors
        "bg-cyan-400 dark:text-[#031018]",

        // hover / active
        "hover:bg-cyan-300 dark:hover:bg-cyan-300 active:scale-[0.98] transition-all",

        // focus
        "focus-visible:ring-2 focus-visible:ring-cyan-400/40",

        // glow
        glow &&
          "shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_12px_40px_rgba(34,211,238,0.45)]",

        className
      )}
    >
      {children}
    </Button>
  );
}
