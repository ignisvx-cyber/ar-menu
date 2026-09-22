import logo from "@/assets/logo-menuar.png.asset.json";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
}

/** Logo oficial do menuAR, usada exatamente como foi fornecida. */
export function Logo({ className }: LogoProps) {
  return (
    <img
      src={logo.url}
      alt="menuAR"
      width={1920}
      height={620}
      className={cn("h-7 w-auto select-none", className)}
      draggable={false}
    />
  );
}
