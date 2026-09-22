import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * Moldura de smartphone vertical (proporção 9:19.5) com acabamento discreto.
 * O conteúdo interno preserva a proporção original — nada é esticado.
 */
export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.2rem] border border-border bg-card p-[3px] shadow-[0_0_60px_-20px_var(--brand-glow)]",
        className,
      )}
    >
      <div className="relative size-full overflow-hidden rounded-[2rem] bg-black">{children}</div>
      <span className="pointer-events-none absolute top-2 left-1/2 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-white/15" />
    </div>
  );
}
