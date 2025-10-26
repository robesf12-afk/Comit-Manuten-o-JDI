// Cada banner pode opcionalmente ter link (href). PNGs ficam em /public/banners
export type Banner = {
  src: string;     // caminho relativo a /public
  alt: string;
  href?: string;   // opcional: se existir, clicou vai para o link
};

export const banners: Banner[] = [
  { src: "/banners/banner1.png", alt: "Campanha 1", href: "https://exemplo.com/campanha-1" },
  { src: "/banners/banner2.png", alt: "Campanha 2" },
  { src: "/banners/banner3.png", alt: "Campanha 3", href: "https://exemplo.com/campanha-3" },
];
