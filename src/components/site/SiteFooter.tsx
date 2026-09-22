import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/site/Logo";
import { getContactHref } from "@/lib/contact";

/** Rodapé com logo, descrição curta e links reais. */
export function SiteFooter() {
  const contactHref = getContactHref();

  return (
    <footer className="border-t border-border px-4 py-12 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo className="h-6" />
          <p className="mt-4 text-sm text-muted-foreground">
            Experiência de cardápio em 3D e realidade aumentada: seus clientes exploram o prato por
            todos os ângulos e, em aparelhos compatíveis, veem o alimento sobre a própria mesa.
          </p>
        </div>

        <nav className="flex flex-col gap-3 text-sm">
          <Link to="/demo" className="text-muted-foreground transition-colors hover:text-foreground">
            Cardápio demonstrativo
          </Link>
          <a
            href="/#como-funciona"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Como funciona
          </a>
          <a
            href="/#perguntas"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Perguntas frequentes
          </a>
          {contactHref ? (
            <a href={contactHref} className="text-muted-foreground transition-colors hover:text-foreground">
              Falar com o menuAR
            </a>
          ) : (
            <span className="text-muted-foreground/60">Canal de contato em configuração</span>
          )}
        </nav>
      </div>

      <p className="mx-auto mt-10 w-full max-w-6xl text-xs text-muted-foreground/70">
        © {new Date().getFullYear()} menuAR. Todos os direitos reservados.
      </p>
    </footer>
  );
}
