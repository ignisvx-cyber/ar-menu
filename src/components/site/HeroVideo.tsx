import { Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

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
 * automática for bloqueada, o arquivo falhar ou outro vídeo assumir a
 * reprodução, voltamos para a capa com um botão de play: a página continua
 * aberta e utilizável.
 */
export function HeroVideo({ src, poster, label }: HeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  // Referência estável: evita que uma nova função a cada render cancele a si mesma.
  const releaseRef = useRef<() => void>(() => {});
  releaseRef.current = () => {
    setMounted(false);
    setShowPlayButton(true);
  };
  const release = useCallback(() => releaseRef.current(), []);

  useEffect(() => {
    if (mounted || showPlayButton) return;
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
  }, [mounted, showPlayButton]);

  useEffect(() => () => releasePlayback(release), [release]);

  return (
    <div ref={containerRef} className="w-full">
      <PhoneFrame>
        {mounted ? (
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
            onPlay={() => claimPlayback(release)}
            onError={(e) => { console.warn("HERO_VIDEO_ERROR", (e.currentTarget as HTMLVideoElement).error?.code, (e.currentTarget as HTMLVideoElement).error?.message); release(); }}
          />
        ) : (
          <>
            <img
              src={poster}
              alt={label}
              className="size-full object-cover"
              decoding="async"
            />
            {showPlayButton ? (
              <button
                type="button"
                onClick={() => {
                  setShowPlayButton(false);
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
