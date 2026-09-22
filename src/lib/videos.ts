import pizza from "@/assets/pizza.mp4.asset.json";
import pizzaPoster from "@/assets/pizza-poster.jpg.asset.json";
import marmita from "@/assets/marmita.mp4.asset.json";
import marmitaPoster from "@/assets/marmita-poster.jpg.asset.json";
import fettuccine from "@/assets/fettuccine.mp4.asset.json";
import fettuccinePoster from "@/assets/fettuccine-poster.jpg.asset.json";
import feijoada from "@/assets/feijoada.mp4.asset.json";
import feijoadaPoster from "@/assets/feijoada-poster.jpg.asset.json";
import hamburguer from "@/assets/hamburguer.mp4.asset.json";
import hamburguerPoster from "@/assets/hamburguer-poster.jpg.asset.json";
import sushi from "@/assets/sushi.mp4.asset.json";
import sushiPoster from "@/assets/sushi-poster.jpg.asset.json";

/** Vídeo vertical principal exibido no celular do hero (hambúrguer). */
export const HERO_VIDEO_URL: string = hamburguer.url;
export const HERO_POSTER_URL: string = hamburguerPoster.url;

export interface GalleryVideo {
  id: string;
  label: string;
  url: string;
  poster: string;
}

/** Um item por vídeo próprio enviado — nada é inventado para completar a fileira. */
export const GALLERY_VIDEOS: readonly GalleryVideo[] = [
  { id: "pizza", label: "Pizza", url: pizza.url, poster: pizzaPoster.url },
  { id: "hamburguer", label: "Hambúrguer", url: hamburguer.url, poster: hamburguerPoster.url },
  { id: "sushi", label: "Sushi", url: sushi.url, poster: sushiPoster.url },
  { id: "fettuccine", label: "Fettuccine", url: fettuccine.url, poster: fettuccinePoster.url },
  { id: "feijoada", label: "Feijoada", url: feijoada.url, poster: feijoadaPoster.url },
  { id: "marmita", label: "Marmita", url: marmita.url, poster: marmitaPoster.url },
] as const;

/** Vídeo usado na seção de produção dos modelos. */
export const PROCESS_VIDEO_URL: string = marmita.url;
export const PROCESS_POSTER_URL: string = marmitaPoster.url;
