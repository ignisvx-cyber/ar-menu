import { Link, createFileRoute } from "@tanstack/react-router";

import { ModelStage } from "@/components/ar/ModelStage";
import { usdzFor } from "@/lib/usdz";
import { HeroVideo } from "@/components/site/HeroVideo";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SafeBlock } from "@/components/site/SafeBlock";
import { SiteHeader } from "@/components/site/SiteHeader";
import { VideoPhone } from "@/components/site/VideoPhone";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import fotoComumSteak from "@/assets/foto-comum-steak.png.asset.json";
import { getContactHref } from "@/lib/contact";
import {
  GALLERY_VIDEOS,
  HERO_POSTER_URL,
  HERO_VIDEO_URL,
  PROCESS_POSTER_URL,
  PROCESS_VIDEO_URL,
} from "@/lib/videos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "menuAR — veja o prato na sua mesa antes de pedir" },
      {
        name: "description",
        content:
          "O menuAR apresenta os pratos do seu restaurante em 3D interativo e, em celulares compatíveis, sobre a mesa do cliente em realidade aumentada.",
      },
      { property: "og:title", content: "menuAR — veja o prato na sua mesa antes de pedir" },
      {
        property: "og:description",
        content:
          "Cardápio com pratos em 3D e realidade aumentada. Conheça a demonstração interativa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const STEPS = [
  {
    number: "01",
    title: "Acesse o cardápio",
    text: "O cliente abre o link ou aponta a câmera para o QR Code do restaurante. Não é preciso instalar nenhum aplicativo próprio.",
  },
  {
    number: "02",
    title: "Explore o prato",
    text: "Ele escolhe um alimento e gira o modelo 3D para observar a apresentação por diferentes ângulos.",
  },
  {
    number: "03",
    title: "Veja na sua mesa",
    text: "Em um aparelho compatível, toca no botão de realidade aumentada, aponta a câmera para uma superfície horizontal e posiciona o prato.",
  },
] as const;

const PRODUCTION = [
  {
    number: "01",
    title: "Registramos o prato",
    text: "Fotografias em diferentes ângulos e informações de referência coletadas pela nossa equipe.",
  },
  {
    number: "02",
    title: "Preparamos o modelo 3D",
    text: "Criação, ajustes visuais e definição das dimensões do modelo.",
  },
  {
    number: "03",
    title: "Levamos ao cardápio",
    text: "Integração do modelo à experiência 3D e à realidade aumentada em aparelhos compatíveis.",
  },
] as const;

const BENEFITS = [
  "Uma maneira interativa de apresentar os pratos.",
  "Visualização do alimento por diferentes ângulos.",
  "Demonstração da apresentação e das proporções do prato.",
  "Experiência disponibilizada por link ou QR Code.",
  "Visualização 3D direto pelo navegador.",
  "Realidade aumentada em aparelhos compatíveis.",
] as const;

const FAQ = [
  {
    q: "Preciso baixar algum aplicativo?",
    a: "Não. O cardápio e a visualização 3D são acessados pelo navegador. A disponibilidade da realidade aumentada depende do celular, do navegador e do suporte do dispositivo.",
  },
  {
    q: "Funciona em iPhone e Android?",
    a: "A visualização 3D funciona em navegadores compatíveis. A realidade aumentada fica disponível nos aparelhos que oferecem o suporte necessário — não há garantia de compatibilidade universal.",
  },
  {
    q: "Como os modelos dos pratos são criados?",
    a: "Nossa equipe reúne fotografias e informações de referência, prepara os modelos 3D e os integra à experiência.",
  },
  {
    q: "O alimento aparece em tamanho real?",
    a: "Os modelos podem ser configurados com as medidas dos pratos reais. Os sete modelos do cardápio demonstrativo utilizam dimensões aproximadas e servem apenas para testar a experiência.",
  },
  {
    q: "Preciso trocar meu cardápio atual?",
    a: "A aplicação do menuAR ao cardápio será definida conforme a necessidade do restaurante.",
  },
  {
    q: "O cliente consegue girar o prato?",
    a: "Sim. Na visualização 3D ele explora o modelo por diferentes ângulos.",
  },
  {
    q: "E se o celular não tiver suporte à realidade aumentada?",
    a: "O cliente continua explorando o prato no visualizador 3D, desde que o navegador seja compatível.",
  },
  {
    q: "Posso conhecer a experiência antes de contratar?",
    a: "Sim. Disponibilizamos um cardápio demonstrativo fictício com sete pratos para explorar.",
  },
] as const;

function Landing() {
  const contactHref = getContactHref();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-16">
        {/* HERO */}
        <section className="relative overflow-hidden px-4 pt-14 pb-20 sm:px-6">
          {/*
            Brilho da marca desenhado com gradiente radial em vez de `filter: blur`.
            O Safari do iPhone derruba a aba ao rasterizar um desfoque de 120px
            em um elemento desse tamanho — o gradiente produz o mesmo efeito
            visual sem custo de GPU.
          */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-[-14rem] left-1/2 size-[40rem] -translate-x-1/2"
            style={{
              backgroundImage:
                "radial-gradient(circle at 42% 45%, oklch(0.78 0.17 62 / 26%) 0%, oklch(0.6 0.25 2 / 18%) 38%, transparent 68%)",
            }}
          />
          <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center">
            <span className="text-brand text-xs font-semibold tracking-[0.3em] uppercase">
              Realidade aumentada para cardápios
            </span>
            <h1 className="mt-5 text-4xl leading-[1.05] font-extrabold text-balance sm:text-6xl">
              Veja o prato na sua mesa.{" "}
              <span className="text-brand">Antes mesmo de pedir.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Explore os pratos em 3D e descubra como eles ficam na sua mesa, direto pelo celular.
            </p>

            <div className="mt-10 w-[15rem] sm:w-[17rem]">
              <SafeBlock>
                <HeroVideo
                  src={HERO_VIDEO_URL}
                  poster={HERO_POSTER_URL}
                  label="Hambúrguer visto sobre uma mesa em realidade aumentada"
                />
              </SafeBlock>
            </div>
          </div>
        </section>

        {/* HAMBÚRGUER 3D */}
        <section id="demonstracao" className="px-4 py-16 sm:px-6">
          <div className="mx-auto w-full max-w-3xl">
            <SafeBlock>
              <ModelStage
                src="/models/burger.glb"
                iosSrc={usdzFor("burger")}
                alt="Modelo 3D interativo de um hambúrguer"
                lazy
                exclusive
                showArButton
                arLabel="Ver na minha mesa"
                className="h-[22rem] sm:h-[30rem]"
              />
            </SafeBlock>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/demo"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-card px-7 text-sm font-semibold text-foreground transition-colors hover:bg-accent sm:min-w-56"
              >
                Ver um cardápio inteiro
              </Link>
            </div>
          </div>
        </section>

        {/* FOTO x 3D */}
        <section id="como-funciona" className="px-4 py-16 sm:px-6">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-balance sm:text-4xl">
                Uma foto mostra o prato.{" "}
                <span className="text-brand">O menuAR mostra a experiência.</span>
              </h2>
              <p className="mt-5 text-muted-foreground">
                Com a visualização em 3D, seu cliente pode conhecer o alimento por outros ângulos e,
                em aparelhos compatíveis, projetá-lo sobre a mesa antes de fazer o pedido.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <figure className="overflow-hidden rounded-3xl border border-border bg-card">
                <img
                  src={fotoComumSteak.url}
                  alt="Imagem estática de um prato, como em um cardápio tradicional"
                  className="h-52 w-full object-cover sm:h-64"
                  loading="lazy"
                />
                <figcaption className="px-4 py-3 text-xs tracking-[0.15em] text-muted-foreground uppercase">
                  Foto comum
                </figcaption>
              </figure>
              <div className="overflow-hidden rounded-3xl border border-border bg-card">
                <SafeBlock>
                  <ModelStage
                    src="/models/grilled-steak.glb"
                    alt="Modelo 3D interativo de um bife grelhado"
                    deferred
                    exclusive
                    openLabel="Ver em 3D"
                    className="h-52 rounded-none border-0 sm:h-64"
                  />
                </SafeBlock>
                <p className="px-4 py-3 text-xs tracking-[0.15em] text-brand uppercase">
                  3D interativo
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TRÊS PASSOS */}
        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto w-full max-w-6xl">
            <h2 className="max-w-2xl text-3xl font-bold text-balance sm:text-4xl">
              Do cardápio à sua mesa em <span className="text-brand">três passos.</span>
            </h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {STEPS.map((step) => (
                <li key={step.number} className="rounded-3xl border border-border bg-card p-6">
                  <span className="text-brand text-sm font-bold tracking-widest">{step.number}</span>
                  <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PRODUÇÃO DOS MODELOS */}
        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-14">
            <div className="mx-auto w-[14rem] md:mx-0 md:w-full">
              <VideoPhone
                src={PROCESS_VIDEO_URL}
                poster={PROCESS_POSTER_URL}
                label="Preparação do modelo"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-balance sm:text-4xl">
                Do prato real à <span className="text-brand">experiência digital.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Nós cuidamos da preparação dos modelos para que seus clientes possam explorar seus
                pratos em 3D.
              </p>
              <ul className="mt-8 flex flex-col gap-4">
                {PRODUCTION.map((item) => (
                  <li
                    key={item.number}
                    className="flex gap-4 rounded-3xl border border-border bg-card p-5"
                  >
                    <span className="text-brand text-sm font-bold tracking-widest">
                      {item.number}
                    </span>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* GALERIA DE VÍDEOS */}
        <section className="py-16">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-balance sm:text-4xl">
              Veja a experiência <span className="text-brand">acontecendo.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Diferentes pratos, diferentes perspectivas. Explore como a realidade aumentada
              transforma a apresentação do cardápio.
            </p>
          </div>
          <ul className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:snap-none lg:overflow-visible">
            {GALLERY_VIDEOS.map((video) => (
              <li key={video.id} className="w-[10.5rem] flex-none snap-center lg:w-auto lg:flex-1">
                <VideoPhone src={video.url} poster={video.poster} label={video.label} />
              </li>
            ))}
          </ul>
        </section>

        {/* SEÇÃO COMERCIAL */}
        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto w-full max-w-6xl rounded-[2rem] border border-border bg-card p-8 sm:p-12">
            <h2 className="max-w-2xl text-3xl font-bold text-balance sm:text-4xl">
              Seu cardápio, de um jeito que o cliente{" "}
              <span className="text-brand">ainda não viu.</span>
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span
                    aria-hidden
                    className="mt-1.5 size-2 flex-none rounded-full"
                    style={{ backgroundImage: "var(--brand-gradient)" }}
                  />
                  {benefit}
                </li>
              ))}
            </ul>
            <Link
              to="/demo"
              className="mt-10 inline-flex min-h-12 items-center justify-center rounded-full bg-[image:var(--brand-gradient)] px-7 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Explorar demonstração
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section id="perguntas" className="px-4 py-16 sm:px-6">
          <div className="mx-auto w-full max-w-3xl">
            <h2 className="text-3xl font-bold text-balance sm:text-4xl">
              Tudo o que você <span className="text-brand">precisa saber.</span>
            </h2>
            <Accordion type="single" collapsible className="mt-8 flex flex-col gap-3">
              {FAQ.map((item, index) => (
                <AccordionItem
                  key={item.q}
                  value={`faq-${index}`}
                  className="rounded-2xl border border-border bg-card px-5"
                >
                  <AccordionTrigger className="text-left text-base hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CHAMADA FINAL */}
        <section id="contato" className="px-4 pt-8 pb-20 sm:px-6">
          <div className="mx-auto w-full max-w-4xl rounded-[2rem] border border-border bg-card px-6 py-14 text-center sm:px-12">
            <h2 className="text-3xl font-bold text-balance sm:text-4xl">
              Seu próximo cardápio pode surpreender{" "}
              <span className="text-brand">antes do primeiro pedido.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Conheça a experiência do menuAR e descubra como apresentar seus pratos em 3D.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {contactHref ? (
                <a
                  href={contactHref}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[image:var(--brand-gradient)] px-7 text-sm font-semibold text-background transition-opacity hover:opacity-90 sm:w-auto"
                >
                  Quero no meu restaurante
                </a>
              ) : (
                <p className="rounded-full border border-border px-6 py-3 text-sm text-muted-foreground">
                  Canal oficial de contato em configuração.
                </p>
              )}
              <Link
                to="/demo"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-border px-7 text-sm font-semibold text-foreground transition-colors hover:bg-accent sm:w-auto"
              >
                Explorar demonstração
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
