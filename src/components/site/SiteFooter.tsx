import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/site/Logo";
import { WHATSAPP_DISPLAY, whatsappHref } from "@/lib/contact";

/** Rodapé com logo, descrição curta e links reais. */
export function SiteFooter() {

  return (
    <footer className="border-t border-border px-4 py-12 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo className="h-6" />
          <p className="mt-4 text-sm text-muted-foreground">
            Experiência de cardápio em 3D e realidade aumentada: seus clientes exploram o prato por
            todos os ângulos e, em aparelhos compatíveis, veem o alimento sobre a própria mesa.
          </p>
          <a
            href="https://www.instagram.com/meumenuar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram do menuAR (abre em nova aba)"
            className="mt-5 inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-transparent hover:bg-[image:var(--brand-gradient)] hover:text-background"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
            </svg>
          </a>
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
          <a href="/#planos" className="text-muted-foreground transition-colors hover:text-foreground">
            Planos
          </a>
          <a
            href="/#perguntas"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Perguntas frequentes
          </a>
          <a
            href={whatsappHref("footer")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
        </nav>
      </div>

      <p className="mx-auto mt-10 w-full max-w-6xl text-xs text-muted-foreground/70">
        © {new Date().getFullYear()} menuAR. Todos os direitos reservados.
      </p>
    </footer>
  );
}
