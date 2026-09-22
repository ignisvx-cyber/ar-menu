/**
 * Heurísticas de capacidade do aparelho.
 *
 * Aparelhos antigos (iPhone 7, por exemplo: 2 GB de RAM, 2 núcleos, Safari do
 * iOS 15) não suportam abrir vídeo e WebGL ao mesmo tempo. Nesses casos a
 * página começa somente com imagens e o visitante escolhe o que carregar.
 */
export function isLowPowerDevice(): boolean {
  if (typeof navigator === "undefined") return false;

  const cores = navigator.hardwareConcurrency;
  if (typeof cores === "number" && cores > 0 && cores <= 2) return true;

  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (typeof memory === "number" && memory > 0 && memory <= 2) return true;

  return false;
}

/** Verifica se o navegador consegue mesmo criar um contexto WebGL. */
export function supportsWebgl(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl") ??
      canvas.getContext("webgl2");
    return Boolean(gl);
  } catch {
    return false;
  }
}
