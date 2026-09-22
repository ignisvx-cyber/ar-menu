import { Play } from "lucide-react";
import { useRef, useState } from "react";

import { PhoneFrame } from "@/components/site/PhoneFrame";
import { cn } from "@/lib/utils";

export interface VideoPhoneProps {
  src: string;
  label: string;
  /** Imagem de capa exibida antes da reprodução. */
  poster?: string;
  className?: string;
  /** Reproduz automaticamente em loop e sem som (usado no hero). */
  auto?: boolean;
}

/**
 * Vídeo vertical dentro de uma moldura de smartphone.
 *
 * Fora do modo `auto`, o arquivo só é baixado quando o visitante toca no play
 * (`preload="none"`), evitando carregar toda a galeria de uma vez.
 */
export function VideoPhone({ src, label, poster, className, auto = false }: VideoPhoneProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(auto);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    video.play().catch((error: unknown) => {
      console.error("Não foi possível reproduzir o vídeo", error);
    });
  };

  return (
    <figure className={cn("flex flex-col items-center gap-3", className)}>
      <PhoneFrame>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="size-full object-cover"
          playsInline
          muted
          loop
          controls={started && !auto}
          autoPlay={auto}
          preload={auto ? "auto" : "none"}
        />
        {!started ? (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Reproduzir demonstração: ${label}`}
            className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors hover:bg-black/25 focus-visible:ring-2 focus-visible:ring-[var(--brand-to)] focus-visible:outline-none"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-[image:var(--brand-gradient)] text-background">
              <Play className="size-6 translate-x-[1px]" fill="currentColor" />
            </span>
          </button>
        ) : null}
      </PhoneFrame>
      <figcaption className="text-sm text-muted-foreground">{label}</figcaption>
    </figure>
  );
}
