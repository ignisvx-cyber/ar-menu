import { createFileRoute } from "@tanstack/react-router";

import { ModelStage } from "@/components/ar/ModelStage";
import { SafeBlock } from "@/components/site/SafeBlock";

export const Route = createFileRoute("/teste-monster")({
  head: () => ({
    meta: [
      { title: "Teste de escala — Monster 473 ml" },
      { name: "description", content: "Teste temporário de escala da lata Monster em realidade aumentada." },
      { property: "og:title", content: "Teste de escala — Monster 473 ml" },
      { property: "og:description", content: "Teste temporário de escala da lata Monster em realidade aumentada." },
    ],
  }),
  component: TesteMonsterPage,
});

const MODEL_SRC = "/models/monster-473ml-teste-leve.glb";

function TesteMonsterPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-8 px-5 py-12">
      <header className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Teste de escala — Monster 473 ml
        </h1>
        <p className="text-sm text-muted-foreground">
          Coloque uma lata real ao lado da lata virtual para comparar o tamanho.
        </p>
      </header>

      <SafeBlock>
        <ModelStage
          src={MODEL_SRC}
          alt="Lata Monster Energy 473 ml em escala real"
          className="aspect-[3/4] sm:aspect-square"
          showArButton
          arLabel="Ver na minha mesa"
        />
      </SafeBlock>

      <p className="text-center text-xs text-muted-foreground">
        O modelo mantém as dimensões físicas reais (15,7 × 6,6 × 6,6 cm). Em aparelhos
        compatíveis, o botão abre a realidade aumentada e apoia a lata pela base sobre a mesa.
      </p>
    </main>
  );
}
