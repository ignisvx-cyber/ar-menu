/**
 * Coordenação global dos visualizadores 3D.
 *
 * Cada <model-viewer> ativo mantém um contexto WebGL e a textura do modelo na
 * memória. Em aparelhos antigos dois contextos simultâneos já derrubam a aba,
 * por isso as cenas marcadas como exclusivas mantêm apenas UMA viva por vez.
 */
type Release = () => void;

let current: Release | null = null;

/** Registra a cena que passou a ser exibida, desmontando a anterior. */
export function claimModel(release: Release): void {
  if (current && current !== release) {
    current();
  }
  current = release;
}

/** Remove o registro quando a cena é fechada ou desmontada. */
export function releaseModel(release: Release): void {
  if (current === release) {
    current = null;
  }
}
