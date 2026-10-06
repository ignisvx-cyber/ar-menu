import sushiArAsset from "@/assets/models/sushi-ar-75pct.glb.asset.json";

/** Separate physical-size asset; never use this URL for the page preview. */
export function arModelFor(id: string): string | undefined {
  return id === "sushi-champanhe" ? sushiArAsset.url : undefined;
}