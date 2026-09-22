import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { PhoneFrame } from "@/components/site/PhoneFrame";
import { claimPlayback, releasePlayback } from "@/lib/video-playback";

export interface HeroVideoProps {
  src: string;
  poster: string;
  /** Descrição acessível da demonstração exibida. */
  label: string;
}

/**
 * Demonstração principal do hero.
 *
 * A primeira renderização mostra apenas a imagem de capa — nenhum elemento
 * `<video>` participa do carregamento inicial da página. O vídeo só é montado
 * depois da hidratação, quando a moldura está visível. Se a reprodução
 * automática for bloqueada ou o arquivo falhar, voltamos para a capa com um
 * botão de play: a página continua abrindo normalmente.
 */
export function HeroVideo({ src, poster, label }: HeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted]);

  useEffect(() => {
    if (!mounted || failed) return;
    const release = () => setFailed(true);
    claimPlayback(release);
    return () => releasePlayback(release);
  }, [mounted, failed]);

  const showVideo = mounted && !failed;

  return (
    <div ref={containerRef} className="w-full">
      <PhoneFrame>
        {showVideo ? (
          <video
            src={src}
            poster={poster}
            className="size-full object-cover"
            aria-label={label}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
          />
        ) : (
          <>
            <img
              src={poster}
              alt={label}
              className="size-full object-cover"
              decoding="async"
              fetchPriority="high"
            />
            {failed ? (
              <button
                type="button"
                onClick={() => {
                  setFailed(false);
                  setMounted(true);
                }}
                aria-label={`Reproduzir demonstração: ${label}`}
                className="absolute inset-0 flex items-center justify-center bg-black/40"
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-[image:var(--brand-gradient)] text-background">
                  <Play className="size-6 translate-x-[1px]" fill="currentColor" />
                </span>
              </button>
            ) : null}
          </>
        )}
      </PhoneFrame>
    </div>
  );
}
