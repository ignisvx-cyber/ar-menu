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
 * A capa aparece na primeira pintura (nenhum `<video>` participa do HTML
 * inicial, o que mantém a home leve no Safari antigo). Logo após a hidratação,
 * quando a moldura está próxima da tela, o vídeo é montado e reproduz sozinho,
 * sem áudio e em loop. O botão de play só aparece se o próprio navegador
 * recusar a reprodução automática ou se o arquivo falhar.
 */
export function HeroVideo({ src, poster, label }: HeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
      { rootMargin: "300px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted]);

  // Tenta iniciar a reprodução; só cai para o botão se o navegador recusar.
  useEffect(() => {
    if (!mounted) return;
    const video = videoRef.current;
    if (!video) return;
    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => setShowPlayButton(true));
    }
  }, [mounted]);

  useEffect(() => () => releasePlayback(release), [release]);

  return (
    <div ref={containerRef} className="w-full">
      <PhoneFrame>
        {mounted ? (
          <>
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              className="size-full object-cover"
              aria-label={label}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onPlay={() => {
                setShowPlayButton(false);
                claimPlayback(release);
              }}
              onError={release}
            />
            {showPlayButton ? (
              <button
                type="button"
                onClick={() => {
                  setShowPlayButton(false);
                  void videoRef.current?.play();
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
        ) : (
          <img src={poster} alt={label} className="size-full object-cover" decoding="async" />
        )}
      </PhoneFrame>
    </div>
  );
}
