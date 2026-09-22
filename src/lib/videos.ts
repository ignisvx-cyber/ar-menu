import heroPizza from "@/assets/heroi-pizza.mp4.asset.json";
import pizza from "@/assets/pizza.mp4.asset.json";
import marmita from "@/assets/marmita.mp4.asset.json";
import fettuccine from "@/assets/fettuccine.mp4.asset.json";
import feijoada from "@/assets/feijoada.mp4.asset.json";
import hamburguer from "@/assets/hamburguer.mp4.asset.json";
import sushi from "@/assets/sushi.mp4.asset.json";

/** Vídeo vertical principal exibido no celular do hero. */
export const HERO_VIDEO_URL: string = heroPizza.url;

export interface GalleryVideo {
  id: string;
  label: string;
  url: string;
}

/** Um item por vídeo próprio enviado — nada é inventado para completar a fileira. */
export const GALLERY_VIDEOS: readonly GalleryVideo[] = [
  { id: "pizza", label: "Pizza", url: pizza.url },
  { id: "hamburguer", label: "Hambúrguer", url: hamburguer.url },
  { id: "sushi", label: "Sushi", url: sushi.url },
  { id: "fettuccine", label: "Fettuccine", url: fettuccine.url },
  { id: "feijoada", label: "Feijoada", url: feijoada.url },
  { id: "marmita", label: "Marmita", url: marmita.url },
] as const;
