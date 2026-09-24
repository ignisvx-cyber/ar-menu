import braisedMeatDish from "@/assets/usdz/braised-meat-dish.usdz.asset.json";
import burger from "@/assets/usdz/burger.usdz.asset.json";
import cake from "@/assets/usdz/cake.usdz.asset.json";
import cheesyBaguette from "@/assets/usdz/cheesy-baguette.usdz.asset.json";
import chocolateCake from "@/assets/usdz/chocolate-cake.usdz.asset.json";
import grilledSteak from "@/assets/usdz/grilled-steak.usdz.asset.json";
import sushiPlatter from "@/assets/usdz/sushi-platter.usdz.asset.json";

/**
 * Arquivos USDZ dedicados para o AR Quick Look do iPhone.
 *
 * Sem `ios-src`, o model-viewer converte o GLB para USDZ dentro do navegador;
 * essa conversão automática perde parte das informações de material PBR e é a
 * causa dos pratos aparecerem escuros no iPhone. Estes arquivos foram gerados a
 * partir dos MESMOS GLBs (nenhum modelo foi alterado), preservando a aparência
 * atual no Android e no visualizador 3D da página.
 */
export const USDZ_BY_ID: Readonly<Record<string, string>> = {
  burger: burger.url,
  "grilled-steak": grilledSteak.url,
  "sushi-platter": sushiPlatter.url,
  cake: cake.url,
  "braised-meat-dish": braisedMeatDish.url,
  "cheesy-baguette": cheesyBaguette.url,
  "chocolate-cake": chocolateCake.url,
  // USDZ dedicados enviados junto aos novos modelos (public/models).
  "pizza-familia": "/models/menuAR-pizza-familia-40x40x22cm-iphone.usdz",
  "sushi-champanhe": "/models/menuAR-sushi-55x45x38cm-iphone.usdz",
};

/** Retorna o USDZ correspondente ao prato, quando existir. */
export function usdzFor(id: string): string | undefined {
  return USDZ_BY_ID[id];
}
