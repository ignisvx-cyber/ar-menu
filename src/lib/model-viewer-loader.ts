// O bundle do servidor (Cloudflare Worker) avalia os chunks de import dinâmico
// no arranque, e o @google/model-viewer toca em `HTMLElement` no topo do módulo
// — o que derrubava TODAS as rotas em produção com
// "ReferenceError: HTMLElement is not defined".
//
// Importando o arquivo já compilado como URL (`?url`), o pacote deixa de entrar
// no grafo de módulos do servidor: o bundle guarda apenas uma string. No
// navegador, injetamos a tag <script type="module"> sob demanda, mantendo
// exatamente a mesma versão 4.3.1 do visualizador e da realidade aumentada.
import modelViewerUrl from "@google/model-viewer/dist/model-viewer.min.js?url";

let loading: Promise<void> | undefined;

export function loadModelViewer(): Promise<void> {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.reject(new Error("O visualizador 3D só existe no navegador."));
  }
  if (window.customElements?.get("model-viewer")) return Promise.resolve();

  if (!loading) {
    loading = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.type = "module";
      script.src = modelViewerUrl;
      script.onload = () => resolve();
      script.onerror = () => {
        loading = undefined;
        reject(new Error("Não foi possível baixar o visualizador 3D."));
      };
      document.head.appendChild(script);
    }).then(() => window.customElements.whenDefined("model-viewer").then(() => undefined));
  }

  return loading;
}

/** Adianta o download do visualizador quando o navegador fica ocioso após abrir a página. */
export function warmModelViewer(): void {
  if (typeof window === "undefined") return;
  const start = () => void loadModelViewer().catch(() => undefined);
  const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
    .requestIdleCallback;
  const kick = () => (idle ? idle(start, { timeout: 4000 }) : window.setTimeout(start, 2500));
  if (document.readyState === "complete") kick();
  else window.addEventListener("load", kick, { once: true });
}
