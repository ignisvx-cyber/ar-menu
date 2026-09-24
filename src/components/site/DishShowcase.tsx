import { useState } from "react";

import { ModelStage } from "@/components/ar/ModelStage";
import { SafeBlock } from "@/components/site/SafeBlock";
import { usdzFor } from "@/lib/usdz";
import { cn } from "@/lib/utils";

const DISHES = [
  { id: "burger", name: "Hambúrguer", note: "Montagem completa", src: "/models/burger.glb" },
  { id: "grilled-steak", name: "Bife", note: "Corte grelhado", src: "/models/grilled-steak.glb" },
  {
    id: "pizza-familia",
    name: "Pizza família",
    note: "40 × 40 cm",
    src: "/models/menuAR-pizza-familia-40x40x22cm-mobile.glb",
  },
  {
    id: "sushi-champanhe",
    name: "Sushi com champanhe",
    note: "Conjunto completo",
    src: "/models/menuAR-sushi-55x45x38cm-mobile.glb",
  },
] as const;

/**
 * Seletor de quatro pratos com UMA única cena 3D ativa: trocar de prato
 * desmonta o modelo anterior antes de carregar o próximo.
 */
export function DishShowcase() {
  const [activeId, setActiveId] = useState<string>(DISHES[0].id);
  const active = DISHES.find((dish) => dish.id === activeId) ?? DISHES[0];

  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,17rem)_1fr] lg:items-stretch">
      <div
        role="tablist"
        aria-label="Pratos em 3D"
        className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
      >
        {DISHES.map((dish, index) => {
          const selected = dish.id === active.id;
          return (
            <button
              key={dish.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(dish.id)}
              className={cn(
                "flex min-w-[9.5rem] flex-none snap-start items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors lg:min-w-0 lg:py-4",
                selected
                  ? "border-transparent bg-card [background:linear-gradient(var(--card),var(--card))_padding-box,var(--brand-gradient)_border-box]"
                  : "border-border bg-card/40 hover:bg-card",
              )}
            >
              <span
                className={cn(
                  "text-xs font-bold tracking-widest",
                  selected ? "text-brand" : "text-muted-foreground",
                )}
              >
                0{index + 1}
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">{dish.name}</span>
                <span className="text-xs text-muted-foreground">{dish.note}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" aria-label={active.name}>
        <SafeBlock key={active.id}>
          <ModelStage
            src={active.src}
            iosSrc={usdzFor(active.id)}
            alt={`Modelo 3D interativo: ${active.name.toLowerCase()}`}
            lazy
            exclusive
            showArButton
            arLabel="Ver na minha mesa"
            className="h-[22rem] sm:h-[28rem]"
          />
        </SafeBlock>
      </div>
    </div>
  );
}
