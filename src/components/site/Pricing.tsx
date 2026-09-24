import { Check } from "lucide-react";

import { whatsappHref, type WhatsappContext } from "@/lib/contact";
import { cn } from "@/lib/utils";

const FEATURES = [
  "Pratos ilimitados no cardápio",
  "Subdomínio próprio",
  "QR Code para acesso ao cardápio",
  "Analytics completo",
  "Suporte incluso",
  "Manutenção inclusa",
] as const;

const PRINTED_QR = "Material impresso com QR Code personalizado";

const PLANS: readonly {
  id: WhatsappContext;
  name: string;
  price: string;
  term: string;
  featured?: boolean;
  extras?: readonly string[];
}[] = [
  { id: "start", name: "Start", price: "1.199", term: "Contrato de 3 meses" },
  { id: "plus", name: "Plus", price: "897", term: "Contrato de 6 meses", featured: true, extras: [PRINTED_QR] },
  { id: "pro", name: "Pro", price: "699", term: "Contrato de 12 meses", extras: [PRINTED_QR] },
];

/** Planos comerciais: valores mensais; 3, 6 e 12 meses são a duração do contrato. */
export function Pricing() {
  return (
    <section id="planos" className="scroll-mt-16 px-4 py-16 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[0.7rem] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
            Planos
          </span>
          <h2 className="mt-3 text-3xl font-bold text-balance sm:text-4xl">
            Escolha o plano ideal para o <span className="text-brand">seu restaurante.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Todos os planos incluem os mesmos recursos. Muda apenas a mensalidade e a duração do
            contrato.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3 md:items-center">
          {PLANS.map((plan) => (
            <li
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-[1.75rem] border p-7 sm:p-8",
                plan.featured
                  ? "border-transparent bg-card shadow-[0_24px_60px_-28px_var(--brand-glow)] [background:linear-gradient(var(--card),var(--card))_padding-box,var(--brand-gradient)_border-box] md:py-10"
                  : "border-border bg-card/60",
              )}
            >
              {plan.featured ? (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[image:var(--brand-gradient)] px-4 py-1.5 text-[0.65rem] font-bold tracking-[0.2em] whitespace-nowrap text-background">
                  MAIS ESCOLHIDO
                </span>
              ) : null}
              <h3 className="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
                Plano <span className={plan.featured ? "text-brand" : "text-foreground"}>{plan.name}</span>
              </h3>
              <p className="mt-5 flex items-baseline gap-1.5">
                <span className="text-lg font-semibold text-muted-foreground">R$</span>
                <span className="text-5xl font-extrabold tracking-tight text-foreground">
                  {plan.price}
                </span>
                <span className="text-lg font-semibold text-muted-foreground">,00</span>
                <span className="ml-1 text-sm text-muted-foreground">/mês</span>
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">{plan.term}</p>

              <div className="my-6 h-px bg-border" />

              <ul className="flex flex-col gap-3">
                {[...FEATURES, ...(plan.extras ?? [])].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check
                      aria-hidden
                      className={cn(
                        "mt-0.5 size-4 flex-none",
                        plan.featured ? "text-[color:var(--brand-to)]" : "text-[color:var(--brand-from)]",
                      )}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={whatsappHref(plan.id)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "mt-8 inline-flex min-h-12 items-center justify-center rounded-full px-7 text-sm font-semibold transition-opacity hover:opacity-90",
                  plan.featured
                    ? "bg-[image:var(--brand-gradient)] text-background"
                    : "border border-border text-foreground hover:bg-accent",
                )}
              >
                Escolher {plan.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
