import { Link, createFileRoute } from "@tanstack/react-router";

import { ModelStage } from "@/components/ar/ModelStage";
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
import heroDesktop from "@/assets/menuar-hero-desktop.webp.asset.json";
import heroMobile from "@/assets/menuar-hero-mobile.webp.asset.json";
import { Logo } from "@/components/site/Logo";
import { DishShowcase } from "@/components/site/DishShowcase";
import { Pricing } from "@/components/site/Pricing";
import { whatsappHref } from "@/lib/contact";
import { GALLERY_VIDEOS } from "@/lib/videos";

/** Galeria sem o vídeo da marmita, removido da página inicial. */
const HOME_GALLERY = GALLERY_VIDEOS.filter((video) => video.id !== "marmita");

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
    a: "Os modelos podem ser configurados com as medidas dos pratos reais. Os modelos do cardápio demonstrativo utilizam dimensões aproximadas e servem apenas para testar a experiência.",
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
    a: "Sim. Disponibilizamos um cardápio demonstrativo fictício com nove pratos para explorar.",
  },
] as const;

function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />

      <main className="pt-16">
        {/* HERO */}
        <section className="relative">
          <div className="mx-auto grid w-full max-w-7xl items-center lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-4">
            <div className="relative z-10 flex flex-col items-center px-5 pt-10 text-center sm:px-6 lg:items-start lg:py-16 lg:pl-8 lg:text-left">
              <Logo className="h-9 sm:h-11" />
              <span className="mt-8 text-[0.7rem] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
                Realidade aumentada para cardápios
              </span>
              <h1 className="mt-4 text-[2.4rem] leading-[1.04] font-extrabold text-balance sm:text-6xl lg:text-[4.1rem]">
                O futuro do seu cardápio <span className="text-brand">hoje.</span>
              </h1>
              <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
                Seus clientes exploram os pratos em 3D e os veem sobre a própria mesa, direto pelo
                celular — sem instalar nenhum aplicativo.
              </p>
              <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href={whatsappHref("hero")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[image:var(--brand-gradient)] px-7 text-sm font-semibold text-background shadow-[0_10px_30px_-12px_var(--brand-glow)] transition-opacity hover:opacity-90"
                >
                  Quero no meu restaurante
                </a>
                <a
                  href="#demonstracao"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-7 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  Ver demonstração
                </a>
              </div>
            </div>

            {/* Uma única imagem por aparelho: vertical no celular, horizontal no desktop. */}
            <div className="relative px-5 pt-10 pb-4 sm:px-6 lg:py-16 lg:pr-8 lg:pl-4">
              <div className="hero-frame relative overflow-hidden rounded-[1.75rem] border border-border/60 lg:rounded-[2.25rem]">
                <picture>
                  <source media="(min-width: 1024px)" srcSet={heroDesktop.url} width={1672} height={941} />
                  <img
                    src={heroMobile.url}
                    width={800}
                    height={1422}
                    alt="Smartphone sobre a mesa de um restaurante elegante exibindo um prato com o menuAR"
                    fetchPriority="high"
                    className="block aspect-[1/1] w-full object-cover object-[72%_60%] sm:aspect-[4/3] lg:aspect-[6/5] lg:object-[68%_50%]"
                  />
                </picture>
                <div aria-hidden className="hero-frame-shade pointer-events-none absolute inset-0" />
                <div aria-hidden className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-[image:var(--brand-gradient)] opacity-70" />
              </div>
            </div>
          </div>
        </section>

        {/* QUATRO PRATOS EM 3D */}
        <section id="demonstracao" className="scroll-mt-16 px-4 pt-16 pb-16 sm:px-6 lg:pt-10">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-[0.7rem] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
                Demonstração interativa
              </span>
              <h2 className="mt-3 text-3xl font-bold text-balance sm:text-4xl">
                Escolha um prato e <span className="text-brand">gire em 3D.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Modelos reais, carregados um de cada vez. Em aparelhos compatíveis, toque em “Ver na
                minha mesa” para posicionar o prato com a câmera.
              </p>
            </div>
            <DishShowcase />
            <div className="mt-6 flex justify-center">
              <Link
                to="/demo"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-card px-7 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                Ver um cardápio inteiro
              </Link>
            </div>
          </div>
        </section>

        {/* FOTO x 3D */}
        <section id="como-funciona" className="scroll-mt-16 px-4 py-16 sm:px-6">
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
                    lazy
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

        {/* PRODUÇÃO DOS MODELOS — linha do tempo, sem vídeo */}
        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-end">
              <h2 className="text-3xl font-bold text-balance sm:text-4xl">
                Do prato real à <span className="text-brand">experiência digital.</span>
              </h2>
              <p className="text-muted-foreground md:pb-1">
                Nós cuidamos da preparação dos modelos para que seus clientes possam explorar seus
                pratos em 3D. O restaurante não precisa lidar com nenhuma etapa técnica.
              </p>
            </div>
            <ol className="relative mt-10 grid gap-4 md:grid-cols-3">
              <span
                aria-hidden
                className="pointer-events-none absolute top-[2.15rem] right-[16%] left-[16%] hidden h-px opacity-60 md:block"
                style={{ backgroundImage: "var(--brand-gradient)" }}
              />
              {PRODUCTION.map((item) => (
                <li key={item.number} className="relative rounded-3xl border border-border bg-card p-6">
                  <span className="relative inline-flex size-9 items-center justify-center rounded-full bg-[image:var(--brand-gradient)] text-xs font-bold text-background">
                    {item.number}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                </li>
              ))}
            </ol>
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
            {HOME_GALLERY.map((video) => (
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
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#planos"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[image:var(--brand-gradient)] px-7 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                Conhecer os planos
              </a>
              <Link
                to="/demo"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-7 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                Explorar demonstração
              </Link>
            </div>
          </div>
        </section>

        {/* PLANOS */}
        <Pricing />

        {/* FAQ */}
        <section id="perguntas" className="scroll-mt-16 px-4 py-16 sm:px-6">
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
        <section id="contato" className="scroll-mt-16 px-4 pt-8 pb-20 sm:px-6">
          <div className="mx-auto w-full max-w-4xl rounded-[2rem] border border-border bg-card px-6 py-14 text-center sm:px-12">
            <h2 className="text-3xl font-bold text-balance sm:text-4xl">
              Seu próximo cardápio pode surpreender{" "}
              <span className="text-brand">antes do primeiro pedido.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Conheça a experiência do menuAR e descubra como apresentar seus pratos em 3D.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={whatsappHref("final")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[image:var(--brand-gradient)] px-7 text-sm font-semibold text-background transition-opacity hover:opacity-90 sm:w-auto"
              >
                Falar no WhatsApp
              </a>
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
