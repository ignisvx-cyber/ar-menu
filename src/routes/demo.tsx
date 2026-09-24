import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { ModelStage } from "@/components/ar/ModelStage";
import { usdzFor } from "@/lib/usdz";
import { Logo } from "@/components/site/Logo";
import { MENU_ITEMS } from "@/lib/menu-items";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Cardápio demonstrativo — menuAR" },
      {
        name: "description",
        content:
          "Cardápio fictício do menuAR com nove pratos em 3D interativo e tentativa de realidade aumentada em aparelhos compatíveis.",
      },
      { property: "og:title", content: "Cardápio demonstrativo — menuAR" },
      {
        property: "og:description",
        content: "Nove pratos em 3D para explorar e tentar visualizar sobre a sua mesa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DemoMenu,
});

function DemoMenu() {
  return (
    <div className="min-h-screen bg-background">
      {/* Coluna central estreita no desktop, largura total no celular. */}
      <div className="mx-auto w-full max-w-[26rem] px-4 pt-6 pb-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Voltar ao site
        </Link>

        <header className="mt-6 border-b border-border pb-6">
          <Logo className="h-5" />
          <h1 className="mt-4 text-2xl font-bold text-foreground">Restaurante Demonstração menuAR</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Um cardápio fictício criado para você experimentar a tecnologia.
          </p>
          <p className="mt-4 rounded-2xl border border-border bg-card p-3 text-xs text-muted-foreground">
            Arraste os pratos para girar em 3D. Em aparelhos compatíveis, toque em{" "}
            <span className="text-foreground">Ver na minha mesa</span> para posicionar o alimento
            sobre uma superfície horizontal usando a câmera.
          </p>
        </header>

        <ul className="mt-6 flex flex-col gap-6">
          {MENU_ITEMS.map((item) => (
            <li
              key={item.id}
              className="overflow-hidden rounded-3xl border border-border bg-card p-4"
            >
              <div className="relative">
                <span className="absolute top-3 right-3 z-10 rounded-full border border-border bg-background/70 px-2.5 py-1 text-[10px] tracking-[0.18em] text-muted-foreground uppercase backdrop-blur">
                  Ver em AR
                </span>
                <ModelStage
                  src={item.model}
                  iosSrc={usdzFor(item.id)}
                  alt={`Modelo 3D de ${item.name.toLowerCase()}`}
                  lazy
                  showArButton
                  className="h-72 bg-background"
                />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-foreground">{item.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-xs text-muted-foreground/70">
          Cardápio demonstrativo fictício do menuAR. Os modelos utilizam dimensões aproximadas e
          servem apenas para testar a experiência.
        </p>
      </div>
    </div>
  );
}
