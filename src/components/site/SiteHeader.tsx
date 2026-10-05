import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/site/Logo";
import { whatsappHref } from "@/lib/contact";

const NAV_LINKS = [
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/demo", label: "Demonstração", internal: true },
  { href: "/#planos", label: "Planos" },
  { href: "/#perguntas", label: "Perguntas frequentes" },
] as const;

/** Cabeçalho fixo e compacto, funcional no desktop e no celular. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" aria-label="menuAR — início" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) =>
            "internal" in link ? (
              <Link
                key={link.href}
                to="/demo"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ),
          )}
          <a
            href="https://www.instagram.com/meumenuar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram do menuAR (abre em nova aba)"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-transparent hover:bg-[image:var(--brand-gradient)] hover:text-background"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
            </svg>
          </a>
          <a
            href={whatsappHref("header")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center rounded-full bg-[image:var(--brand-gradient)] px-5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Fale conosco
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-border bg-background px-4 pb-5 md:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                {"internal" in link ? (
                  <Link
                    to="/demo"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base text-muted-foreground"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base text-muted-foreground"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <a
            href={whatsappHref("header")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[image:var(--brand-gradient)] px-5 text-sm font-semibold text-background"
          >
            Fale conosco
          </a>
        </nav>
      ) : null}
    </header>
  );
}
