import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type Ref,
} from "react";

import { claimModel, releaseModel } from "@/lib/model-playback";
import { loadModelViewer, warmModelViewer } from "@/lib/model-viewer-loader";
import { supportsWebgl } from "@/lib/device";
import { cn } from "@/lib/utils";

/**
 * Props aceitas pelo custom element <model-viewer>. Declaramos o elemento como
 * um componente tipado para não depender de augmentação global de JSX.
 */
interface ModelViewerElementProps {
  ref?: Ref<HTMLElement>;
  className?: string;
  "aria-hidden"?: boolean;
  loading?: string;
  children?: React.ReactNode;
  src: string;
  "ios-src"?: string;
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
  /** Optional separate model used only when activating AR. */
  arSrc?: string | undefined;
  /**
   * USDZ dedicado usado pelo AR Quick Look do iPhone. Quando ausente, o
   * model-viewer converte o GLB no navegador — conversão que costuma escurecer
   * os materiais.
   */
  iosSrc?: string | undefined;
  /** Texto alternativo acessível descrevendo o alimento. */
  alt: string;
  /** Classe aplicada ao contêiner da cena. */
  className?: string;
  /**
   * Quando `true`, o modelo só começa a carregar ao entrar na viewport.
   * Usado no cardápio para não baixar os sete GLBs de uma vez.
   */
  lazy?: boolean;
  /**
   * Quando `true`, nada 3D é baixado até o visitante tocar em "Ver em 3D".
   * Usado na página inicial, onde a prioridade é abrir rápido mesmo em
   * aparelhos antigos.
   */
  deferred?: boolean;
  /**
   * Quando `true`, esta cena desmonta qualquer outra cena exclusiva que já
   * esteja aberta — só um contexto WebGL vivo por vez.
   */
  exclusive?: boolean;
  /** Rótulo do botão que inicia a cena no modo `deferred`. */
  openLabel?: string;
  /** Renderiza o botão "Ver na minha mesa" abaixo da cena. */
  showArButton?: boolean;
  /** Rótulo do botão de AR. */
  arLabel?: string;
  /** Antecedência com que o modo lazy começa a baixar o prato. */
  lazyMargin?: string;
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
  arSrc,
  iosSrc,
  alt,
  className,
  lazy = false,
  deferred = false,
  exclusive = false,
  openLabel = "Ver em 3D",
  showArButton = false,
  arLabel = "Ver na minha mesa",
  lazyMargin = "900px 0px",
}: ModelStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLElement & { activateAR?: () => void; canActivateAR?: boolean }>(
    null,
  );
  const arViewerRef = useRef<HTMLElement & { activateAR?: () => Promise<void>; canActivateAR?: boolean; loaded?: boolean }>(null);
  const [arPresenting, setArPresenting] = useState(false);
  const [defined, setDefined] = useState(false);
  const [visible, setVisible] = useState(!lazy && !deferred);
  const [state, setState] = useState<LoadState>("idle");
  const [arAvailable, setArAvailable] = useState(false);
  const [arMessage, setArMessage] = useState<string | null>(null);
  const [webglBlocked, setWebglBlocked] = useState(false);

  // Referência estável para o encerramento desta cena (usada pelo coordenador).
  const releaseRef = useRef<() => void>(() => {});
  releaseRef.current = () => {
    setVisible(false);
    setState("idle");
    setArAvailable(false);
  };
  const release = useCallback(() => releaseRef.current(), []);
  useEffect(() => () => releaseModel(release), [release]);
  useEffect(() => warmModelViewer(), []);

  // Carrega o modelo apenas quando o card entra na tela (modo lazy).
  useEffect(() => {
    if (!lazy || deferred || visible) return;
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
      { rootMargin: lazyMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [lazy, deferred, visible, lazyMargin]);

  // Importa o custom element somente no navegador.
  useEffect(() => {
    if (!visible) return;
    if (!supportsWebgl()) {
      setWebglBlocked(true);
      setState("error");
      return;
    }
    if (exclusive) claimModel(release);
    // Baixa o arquivo do prato em paralelo com o visualizador (mesmo arquivo, sem alteração).
    if (!document.querySelector(`link[data-model-preload="${CSS.escape(src)}"]`)) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "fetch";
      link.crossOrigin = "anonymous";
      link.href = src;
      link.dataset["modelPreload"] = src;
      document.head.appendChild(link);
    }
    if (defined) {
      setState((value) => (value === "idle" ? "loading" : value));
      return;
    }
    let cancelled = false;
    setState("loading");
    loadModelViewer()
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
  }, [visible, defined, exclusive, release]);

  // Eventos de carga do modelo e verificação de suporte a AR.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!defined || !visible || !viewer) return;

    const onLoad = () => {
      setState("ready");
      if (!arSrc) setArAvailable(Boolean(viewer.canActivateAR));
    };
    const onError = () => setState("error");

    viewer.addEventListener("load", onLoad);
    viewer.addEventListener("error", onError);
    return () => {
      viewer.removeEventListener("load", onLoad);
      viewer.removeEventListener("error", onError);
    };
  }, [defined, visible, arSrc]);

  // Dedicated AR scene: the page scene's src, camera and dimensions never change.
  useEffect(() => {
    const viewer = arViewerRef.current;
    if (!defined || !visible || !arSrc || !viewer) return;
    const onLoad = () => setArAvailable(Boolean(viewer.canActivateAR));
    const onError = () => {
      setArAvailable(false);
      setArMessage("Não foi possível carregar o sushi para realidade aumentada. Atualize a página para tentar novamente.");
    };
    const onStatus = (event: Event) => {
      const status = (event as CustomEvent<{ status: string }>).detail.status;
      setArPresenting(status === "session-started" || status === "object-placed");
      if (status === "failed") setArMessage("Não foi possível abrir a realidade aumentada neste aparelho.");
    };
    viewer.addEventListener("load", onLoad);
    viewer.addEventListener("error", onError);
    viewer.addEventListener("ar-status", onStatus);
    if (viewer.loaded) onLoad();
    return () => {
      viewer.removeEventListener("load", onLoad);
      viewer.removeEventListener("error", onError);
      viewer.removeEventListener("ar-status", onStatus);
    };
  }, [defined, visible, arSrc]);

  const handleAr = () => {
    const viewer = arSrc ? arViewerRef.current : viewerRef.current;
    if (!viewer?.activateAR) return;
    const onFailure = (error: unknown) => {
      console.error("Não foi possível iniciar a realidade aumentada", error);
      setArMessage("Não foi possível abrir a realidade aumentada neste aparelho.");
    };
    try {
      // Keep activation synchronous with the tap (required by native AR viewers).
      Promise.resolve(viewer.activateAR()).catch(onFailure);
    } catch (error: unknown) {
      onFailure(error);
    }
  };

  const showScene = visible && defined && state !== "error";

  return (
    <div className="flex w-full flex-col gap-3">
      <div
        ref={containerRef}
        className={cn(
          "relative isolate w-full overflow-hidden rounded-3xl border border-border bg-card",
          className,
        )}
      >
        {showScene ? (
          <ModelViewerElement
            ref={viewerRef as never}
            src={src}
            {...(iosSrc ? { "ios-src": iosSrc } : {})}
            alt={alt}
            ar={!arSrc}
            ar-modes="webxr scene-viewer quick-look"
            ar-placement="floor"
            ar-scale="fixed"
            camera-controls
            touch-action="pan-y"
            shadow-intensity="1"
            exposure="1.05"
            interaction-prompt="none"
            style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
          />
        ) : null}

        {!visible ? (
          <button
            type="button"
            onClick={() => setVisible(true)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center"
          >
            <span className="inline-flex min-h-12 items-center justify-center rounded-full bg-[image:var(--brand-gradient)] px-7 text-sm font-semibold text-background">
              {openLabel}
            </span>
            <span className="text-xs text-muted-foreground">{alt}</span>
          </button>
        ) : null}

        {visible && state !== "ready" ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center">
            {state === "error" ? (
              <p className="text-sm text-muted-foreground">
                {webglBlocked
                  ? "Este aparelho não conseguiu abrir a visualização 3D."
                  : "Não foi possível carregar este modelo 3D. Atualize a página para tentar novamente."}
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

      {showScene && arSrc ? (
        <ModelViewerElement
          ref={arViewerRef}
          src={arSrc}
          alt={alt}
          ar
          loading="eager"
          ar-modes="webxr scene-viewer quick-look"
          ar-placement="floor"
          ar-scale="fixed"
          exposure="1.05"
          shadow-intensity="1"
          interaction-prompt="none"
          aria-hidden={!arPresenting}
          className={cn(
            "fixed inset-0 h-dvh w-screen",
            arPresenting ? "z-50" : "pointer-events-none -z-50 opacity-0",
          )}
        >
          <span slot="ar-button" />
        </ModelViewerElement>
      ) : null}

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
