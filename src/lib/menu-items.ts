/**
 * Os sete modelos GLB demonstrativos que já existem em /public/models.
 * As descrições são genéricas de propósito: não inventamos ingredientes,
 * porções ou preços de um restaurante real.
 */
export interface MenuItem {
  /** Identificador estável usado em keys e âncoras. */
  id: string;
  /** Nome exibido do prato. */
  name: string;
  /** Descrição curta e neutra. */
  description: string;
  /** Caminho público do arquivo GLB. */
  model: string;
}

export const MENU_ITEMS: readonly MenuItem[] = [
  {
    id: "burger",
    name: "Hambúrguer",
    description: "Modelo 3D demonstrativo. Gire para ver a montagem por todos os ângulos.",
    model: "/models/burger.glb",
  },
  {
    id: "grilled-steak",
    name: "Bife grelhado",
    description: "Modelo 3D demonstrativo. Explore a apresentação do corte no prato.",
    model: "/models/grilled-steak.glb",
  },
  {
    id: "sushi-platter",
    name: "Combinado de sushi",
    description: "Modelo 3D demonstrativo. Observe a disposição das peças no combinado.",
    model: "/models/sushi-platter.glb",
  },
  {
    id: "cake",
    name: "Bolo",
    description: "Modelo 3D demonstrativo. Veja a altura e o acabamento da fatia.",
    model: "/models/cake.glb",
  },
  {
    id: "braised-meat-dish",
    name: "Prato de carne",
    description: "Modelo 3D demonstrativo. Confira a composição do prato servido.",
    model: "/models/braised-meat-dish.glb",
  },
  {
    id: "cheesy-baguette",
    name: "Baguete com queijo",
    description: "Modelo 3D demonstrativo. Aproxime para observar a textura da superfície.",
    model: "/models/cheesy-baguette.glb",
  },
  {
    id: "chocolate-cake",
    name: "Bolo de chocolate",
    description: "Modelo 3D demonstrativo. Gire para avaliar camadas e cobertura.",
    model: "/models/chocolate-cake.glb",
  },
] as const;
