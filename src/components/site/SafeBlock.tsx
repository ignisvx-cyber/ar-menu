import { Component, type ErrorInfo, type ReactNode } from "react";

interface SafeBlockProps {
  children: ReactNode;
  /** Mensagem exibida no lugar do bloco quando ele falha. */
  fallback?: ReactNode;
}

interface SafeBlockState {
  failed: boolean;
}

/**
 * Limite de erro local.
 *
 * Sem ele, qualquer falha de um vídeo ou de uma cena 3D sobe até a raiz e a
 * página inteira vira a tela "This page didn't load". Com ele, apenas aquele
 * bloco some e o restante da página continua funcionando.
 */
export class SafeBlock extends Component<SafeBlockProps, SafeBlockState> {
  override state: SafeBlockState = { failed: false };

  static getDerivedStateFromError(): SafeBlockState {
    return { failed: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Bloco da página falhou", error, info.componentStack);
  }

  override render() {
    if (this.state.failed) {
      return (
        this.props.fallback ?? (
          <p className="rounded-3xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
            Este conteúdo não pôde ser exibido neste aparelho.
          </p>
        )
      );
    }
    return this.props.children;
  }
}
