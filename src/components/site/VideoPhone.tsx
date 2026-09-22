import { Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { PhoneFrame } from "@/components/site/PhoneFrame";
import { claimPlayback, releasePlayback } from "@/lib/video-playback";
import { cn } from "@/lib/utils";

export interface VideoPhoneProps {
  src: string;
  label: string;
  /** Imagem de capa exibida antes da reprodução. */
  poster?: string | undefined;
  className?: string | undefined;
}

/**
 * Vídeo vertical dentro de uma moldura de smartphone.
 *
 * Enquanto o visitante não toca no play, NENHUM elemento `<video>` existe na
 * página — apenas a imagem de capa. O elemento é criado no toque e desmontado
 * assim que outro vídeo começa a tocar, garantindo um único decodificador de
 * mídia ativo (requisito para o Safari do iPhone não encerrar a aba).
 */
export function VideoPhone({ src, label, poster, className }: VideoPhoneProps) {
  const [active, setActive] = useState(false);

  const releaseRef = useRef<() => void>(() => {});
  releaseRef.current = () => setActive(false);
  const release = useCallback(() => releaseRef.current(), []);

  useEffect(() => () => releasePlayback(release), [release]);

  return (
    <figure className={cn("flex flex-col items-center gap-3", className)}>
      <PhoneFrame>
        {active ? (
          <video
            src={src}
            poster={poster}
            className="size-full object-cover"
            playsInline
            muted
            loop
            controls
            autoPlay
            preload="metadata"
            onPlay={() => claimPlayback(release)}
            onError={release}
          />
        ) : (
          <>
            {poster ? (
              <img
                src={poster}
                alt=""
                aria-hidden
                className="size-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : null}
            <button
              type="button"
              onClick={() => setActive(true)}
              aria-label={`Reproduzir demonstração: ${label}`}
              className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors hover:bg-black/25 focus-visible:ring-2 focus-visible:ring-[var(--brand-to)] focus-visible:outline-none"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-[image:var(--brand-gradient)] text-background">
                <Play className="size-6 translate-x-[1px]" fill="currentColor" />
              </span>
            </button>
          </>
        )}
      </PhoneFrame>
      <figcaption className="text-sm text-muted-foreground">{label}</figcaption>
    </figure>
  );
}
