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
    id: "pizza-familia",
    name: "Pizza família",
    description: "Novo modelo 3D demonstrativo (40 × 40 cm). Veja a fatia levantada e o tamanho real sobre a mesa.",
    model: "/models/menuAR-pizza-familia-40x40x22cm-mobile.glb",
  },
  {
    id: "sushi-champanhe",
    name: "Sushi com champanhe",
    description: "Novo conjunto 3D com bandeja de sushi, taças, balde de gelo e garrafa.",
    model: "/models/menuAR-sushi-55x45x38cm-mobile.glb",
  },
  {
    id: "grilled-steak",
    name: "Bife grelhado",
    description: "Modelo 3D demonstrativo. Explore a apresentação do corte no prato.",
    model: "/models/grilled-steak.glb",
  },
  {
    id: "sushi-platter",
    name: "Combinado de sushi (bandeja simples)",
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
