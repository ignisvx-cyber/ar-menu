import marmita from "@/assets/marmita.mp4.asset.json";
import marmitaPoster from "@/assets/marmita-poster.jpg.asset.json";
import hamburguer from "@/assets/hamburguer.mp4.asset.json";
import hamburguerPoster from "@/assets/hamburguer-poster.jpg.asset.json";
import demoSushi from "@/assets/demo-sushi.mp4.asset.json";
import demoSushiPoster from "@/assets/demo-sushi-poster.jpg.asset.json";
import demoCarne from "@/assets/demo-carne.mp4.asset.json";
import demoCarnePoster from "@/assets/demo-carne-poster.jpg.asset.json";
import demoBaguete from "@/assets/demo-baguete.mp4.asset.json";
import demoBaguetePoster from "@/assets/demo-baguete-poster.jpg.asset.json";
import demoBolo from "@/assets/demo-bolo.mp4.asset.json";
import demoBoloPoster from "@/assets/demo-bolo-poster.jpg.asset.json";

/** Vídeo vertical principal exibido no celular do hero (hambúrguer). */
export const HERO_VIDEO_URL: string = hamburguer.url;
export const HERO_POSTER_URL: string = hamburguerPoster.url;

export interface GalleryVideo {
  id: string;
  label: string;
  url: string;
  poster: string;
}

/** Galeria "Veja a experiência acontecendo." — somente vídeos próprios do menuAR. */
export const GALLERY_ENABLED = true;

/** Ordem definida pelo cliente: Sushi, Carne, Baguete e depois o restante. */
export const GALLERY_VIDEOS: readonly GalleryVideo[] = [
  { id: "sushi", label: "Sushi", url: demoSushi.url, poster: demoSushiPoster.url },
  { id: "carne", label: "Carne", url: demoCarne.url, poster: demoCarnePoster.url },
  { id: "baguete", label: "Baguete", url: demoBaguete.url, poster: demoBaguetePoster.url },
  { id: "bolo", label: "Bolo", url: demoBolo.url, poster: demoBoloPoster.url },
] as const;

/** Vídeo usado na seção de produção dos modelos. */
export const PROCESS_VIDEO_URL: string = marmita.url;
export const PROCESS_POSTER_URL: string = marmitaPoster.url;
