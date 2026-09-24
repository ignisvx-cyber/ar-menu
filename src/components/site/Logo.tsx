import logo from "@/assets/logo-menuar.png.asset.json";
import symbol from "@/assets/menuar-symbol.webp.asset.json";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  /** Exibe o símbolo (chapéu de chef) ao lado da logo escrita. */
  withSymbol?: boolean;
}

/** Assinatura do menuAR: símbolo oficial + logo escrita, sem alterações. */
export function Logo({ className, withSymbol = true }: LogoProps) {
  return (
    <span className={cn("inline-flex h-7 items-center gap-[0.35em] select-none", className)}>
      {withSymbol ? (
        <img
          src={symbol.url}
          alt=""
          aria-hidden
          width={400}
          height={263}
          className="h-[58%] w-auto"
          draggable={false}
        />
      ) : null}
      <img
        src={logo.url}
        alt="menuAR"
        width={1920}
        height={620}
        className="h-full w-auto"
        draggable={false}
      />
    </span>
  );
}
