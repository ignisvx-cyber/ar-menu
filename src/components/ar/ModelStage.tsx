import { useEffect, useRef, useState, type ComponentType, type CSSProperties, type Ref } from "react";

import { cn } from "@/lib/utils";

/**
 * Props aceitas pelo custom element <model-viewer>. Declaramos o elemento como
 * um componente tipado para não depender de augmentação global de JSX.
 */
interface ModelViewerElementProps {
  ref?: Ref<HTMLElement>;
  src: string;
  alt: string;
  ar?: boolean;
  "ar-modes"?: string;
  "ar-placement"?: string;
  "ar-scale"?: string;
  "camera-controls"?: boolean;
  "touch-action"?: string;
  "shadow-intensity"?: string;
  exposure?: string;
  "interaction-prompt"?: string;
  style?: CSSProperties;
}

const ModelViewerElement = "model-viewer" as unknown as ComponentType<ModelViewerElementProps>;


export interface ModelStageProps {
  /** Caminho público do GLB, ex.: "/models/burger.glb". */
  src: string;
  /** Texto alternativo acessível descrevendo o alimento. */
  alt: string;
  /** Classe aplicada ao contêiner da cena. */
  className?: string;
  /**
   * Quando `true`, o modelo só começa a carregar ao entrar na viewport.
   * Usado no cardápio para não baixar os sete GLBs de uma vez.
   */
  lazy?: boolean;
  /** Renderiza o botão "Ver na minha mesa" abaixo da cena. */
  showArButton?: boolean;
  /** Rótulo do botão de AR. */
  arLabel?: string;
}

type LoadState = "idle" | "loading" | "ready" | "error";

/**
 * Visualizador 3D real baseado em @google/model-viewer.
 *
 * O custom element só existe no navegador, por isso a biblioteca é importada
 * dinamicamente após a hidratação. Antes disso mostramos um estado de
 * carregamento — nunca uma imagem fingindo ser 3D.
 */
export function ModelStage({
  src,
  alt,
  className,
  lazy = false,
  showArButton = false,
  arLabel = "Ver na minha mesa",
}: ModelStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLElement & { activateAR?: () => void; canActivateAR?: boolean }>(
    null,
  );
  const [defined, setDefined] = useState(false);
  const [visible, setVisible] = useState(!lazy);
  const [state, setState] = useState<LoadState>("idle");
  const [arAvailable, setArAvailable] = useState(false);
  const [arMessage, setArMessage] = useState<string | null>(null);

  // Carrega o modelo apenas quando o card entra na tela (modo lazy).
  useEffect(() => {
    if (!lazy || visible) return;
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [lazy, visible]);

  // Importa o custom element somente no navegador.
  useEffect(() => {
    if (!visible || defined) return;
    let cancelled = false;
    setState("loading");
    import("@google/model-viewer")
      .then(() => {
        if (!cancelled) setDefined(true);
      })
      .catch((error: unknown) => {
        console.error("Falha ao carregar o visualizador 3D", error);
        if (!cancelled) setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, [visible, defined]);

  // Eventos de carga do modelo e verificação de suporte a AR.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!defined || !viewer) return;

    const onLoad = () => {
      setState("ready");
      setArAvailable(Boolean(viewer.canActivateAR));
    };
    const onError = () => setState("error");

    viewer.addEventListener("load", onLoad);
    viewer.addEventListener("error", onError);
    return () => {
      viewer.removeEventListener("load", onLoad);
      viewer.removeEventListener("error", onError);
    };
  }, [defined]);

  const handleAr = () => {
    const viewer = viewerRef.current;
    if (!viewer?.activateAR) return;
    try {
      viewer.activateAR();
    } catch (error: unknown) {
      console.error("Não foi possível iniciar a realidade aumentada", error);
      setArMessage("Não foi possível abrir a realidade aumentada neste aparelho.");
    }
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div
        ref={containerRef}
        className={cn(
          "relative isolate w-full overflow-hidden rounded-3xl border border-border bg-card",
          className,
        )}
      >
        {defined && state !== "error" ? (
          <ModelViewerElement
            ref={viewerRef as never}
            src={src}
            alt={alt}
            ar
            ar-modes="webxr scene-viewer quick-look"
            ar-placement="floor"
            ar-scale="fixed"
            camera-controls
            touch-action="pan-y"
            shadow-intensity="1"
            exposure="1.05"
            interaction-prompt="none"
            min-camera-orbit="auto auto auto"
            max-camera-orbit="auto auto auto"
            style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
          />
        ) : null}

        {state !== "ready" ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center">
            {state === "error" ? (
              <p className="text-sm text-muted-foreground">
                Não foi possível carregar este modelo 3D. Atualize a página para tentar novamente.
              </p>
            ) : (
              <span className="flex items-center gap-2 text-xs tracking-widest text-muted-foreground uppercase">
                <span className="size-2 animate-pulse rounded-full bg-[var(--brand-from)]" />
                Carregando modelo
              </span>
            )}
          </div>
        ) : null}

        {state === "ready" ? (
          <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-border bg-background/70 px-3 py-1 text-[10px] tracking-[0.18em] text-muted-foreground uppercase backdrop-blur">
            Arraste para girar
          </span>
        ) : null}
      </div>

      {showArButton ? (
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleAr}
            disabled={!arAvailable}
            className={cn(
              "inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 text-sm font-semibold transition-opacity",
              arAvailable
                ? "bg-[image:var(--brand-gradient)] text-background hover:opacity-90"
                : "cursor-not-allowed border border-border bg-card text-muted-foreground",
            )}
          >
            {arLabel}
          </button>
          <p className="text-center text-xs text-muted-foreground">
            {arMessage ??
              (arAvailable
                ? "Aponte a câmera para uma superfície horizontal para posicionar o prato."
                : "A realidade aumentada depende do aparelho e do navegador. Abra pelo celular para tentar.")}
          </p>
        </div>
      ) : null}
    </div>
  );
}
