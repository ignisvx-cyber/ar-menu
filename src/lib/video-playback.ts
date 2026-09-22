/**
 * Coordenação global de reprodução de vídeo.
 *
 * O Safari do iPhone reserva um decodificador de mídia por elemento `<video>`
 * ativo. Manter vários elementos vivos ao mesmo tempo esgota esse recurso e o
 * navegador encerra a aba. Por isso a página mantém, no máximo, UM vídeo
 * montado por vez: quem começa a tocar avisa aqui e o anterior é desmontado.
 */
type Release = () => void;

let current: Release | null = null;

/** Registra o vídeo que passa a tocar, liberando o anterior. */
export function claimPlayback(release: Release): void {
  if (current && current !== release) {
    current();
  }
  current = release;
}

/** Remove o registro quando o vídeo é desmontado ou pausado. */
export function releasePlayback(release: Release): void {
  if (current === release) {
    current = null;
  }
}
