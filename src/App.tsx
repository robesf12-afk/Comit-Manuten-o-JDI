// src/App.tsx
import React, { useEffect, useState, useRef } from "react";
import { initPush } from "./push";

import {
  IconOKR,
  IconDDM,
  IconOnePager,
  IconTreinamentos,
  IconPapeis,
  IconChecklist,
  IconRegistroPCM,
  IconReconhecimentos,
} from "./icons";

/* ===== Ícones locais ===== */
const IconHelp: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path
      d="M9.7 9.5a2.8 2.8 0 0 1 5.1 1.6c0 2-2.6 2.3-2.6 3.9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="18" r="1.25" fill="currentColor" />
  </svg>
);
const IconDoc: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M14 3v5h5" stroke="currentColor" strokeWidth="2" />
    <path d="M9.5 12h5M9.5 15.5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ===== Links ===== */
const LINKS = {
  okr: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=e0QIRb",
  ddm: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S?csf=1&web=1&e=kXfLLD",
  onepager: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/ONE%20PAGER?csf=1&web=1&e=mTBbo1",
  treinamentos: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/TREINAMENTOS?csf=1&web=1&e=RYgJ70",
  papeis: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/PAP%C3%89IS%20E%20RESPONSABILIDADES?csf=1&web=1&e=C529Nu",
  informativos: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS?csf=1&web=1&e=dy3e4Y",
  checklist: "https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink",
  registro: "https://forms.office.com/r/mt0JTBJiK6?origin=lprLink",
  reconhecimentos: "https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink",
  programacao:
    "https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PROGRAMA%C3%87%C3%83O%20PRE%20PCM?csf=1&web=1&e=abSPHT",
  painel:
    "https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PAINEL%20DISTRIBUI%C3%87%C3%83O%20DE%20HORAS?csf=1&web=1&e=VWusRL",
  duvidas:
    "https://forms.office.com/Pages/ResponsePage.aspx?id=QtWUcBU4gkyx1WkX0EQ89IvsP_YVPjJJhA-rzC2o4A5UQ0RMMlM0MVZKWFdVN01IMzlUSjBMWVZBSS4u",
  custo:
    "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/CUSTO%20DE%20MANUTEN%C3%87%C3%83O?csf=1&web=1&e=S0gfpV",

  backlog:
    "https://cocacolafemsa.sharepoint.com/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/Forms/AllItems.aspx?id=%2Fsites%2FPROGRAMAOPREPCMJUNDIAIOSASCO%2FDocumentos%20Compartilhados%2FBACKLOG%20PLANOS%5FCORRETIVAS&viewid=308aff45%2D8d06%2D4097%2D93e5%2Dabd3af4e0bf4",
  controleOrdens:
    "https://cocacolafemsa.sharepoint.com/:f:/r/sites/Aprovaodematerial/Documentos%20Compartilhados/Bases%20-%20Semana%2045?csf=1&web=1&e=1BIDKL",
};

/* ===== Menu ===== */
const MENU = [
  { id: "registro", title: "Registro de reuniões Abertura de PCM e Prestação de Contas", url: LINKS.registro, Icon: IconRegistroPCM },
  { id: "checklist", title: "Registro Check List Pós Partida de PCM", url: LINKS.checklist, Icon: IconChecklist },
  { id: "programacao", title: "Programação de PCM", url: LINKS.programacao, Icon: IconChecklist },
  { id: "painel", title: "Painel de Distribuição de Horas", url: LINKS.painel, Icon: IconOKR },
  { id: "backlog", title: "BACKLOG - Consulte aqui o backlog da sua área", url: LINKS.backlog, Icon: IconChecklist },
  { id: "ddms", title: "DDM's", url: LINKS.ddm, Icon: IconDDM },
  { id: "okr", title: "OKR de Manutenção (Fechamentos)", url: LINKS.okr, Icon: IconOKR },
  { id: "custo", title: "Custo de Manutenção", url: LINKS.custo, Icon: IconOKR },
  { id: "controle", title: "Controle de Aprovação de Ordens", url: LINKS.controleOrdens, Icon: IconOKR },
  { id: "onepager", title: "One Pager", url: LINKS.onepager, Icon: IconOnePager },
  { id: "treinamentos", title: "Treinamentos", url: LINKS.treinamentos, Icon: IconTreinamentos },
  { id: "papeis", title: "Papéis e Responsabilidades", url: LINKS.papeis, Icon: IconPapeis },
  { id: "reconhecimentos", title: "Reconhecimentos", url: LINKS.reconhecimentos, Icon: IconReconhecimentos },
  { id: "informativos", title: "Informativos", url: LINKS.informativos, Icon: IconDoc },
  { id: "duvidas", title: "Dúvidas e Sugestões sobre os processos de Manutenção", url: LINKS.duvidas, Icon: IconHelp },
];

/* ===== One Pagers ===== */
const ORDEM_ONEPAGERS = ["one pager fabrica.PNG", "one pager G1.PNG", "one pager G2.PNG", "one pager G3.PNG"];

function sortOnePagers(list: string[]) {
  const inOrder = ORDEM_ONEPAGERS.filter((n) => list.includes(n));
  const extras = list.filter((n) => !ORDEM_ONEPAGERS.includes(n));
  return [...inOrder, ...extras];
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [onePagers, setOnePagers] = useState<string[]>([]);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [erro, setErro] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    initPush(); // Inicializa notificações
  }, []);

  useEffect(() => {
    fetch(`/banners_media/onepagers.json?v=${Date.now()}`)
      .then((res) => res.json())
      .then((data: string[]) => {
        setOnePagers(sortOnePagers(data));
      })
      .catch(() => setErro(true));
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const min = 40;
    if (!onePagers.length) return;
    if (diff > min) setBannerIndex((p) => (p + 1) % onePagers.length);
    else if (diff < -min) setBannerIndex((p) => (p - 1 + onePagers.length) % onePagers.length);
    touchStartX.current = touchEndX.current = null;
  };

  const goPrev = () => setBannerIndex((p) => (p - 1 + onePagers.length) % onePagers.length);
  const goNext = () => setBannerIndex((p) => (p + 1) % onePagers.length);

  const current = onePagers[bannerIndex] ? `/banners_media/${onePagers[bannerIndex]}` : null;

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [onePagers.length]);

  return (
    <div>
      <header className="topbar">
        <div className="topbar-inner">
          <button className="menu-btn" onClick={() => setOpen(true)}>
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
          <img className="logo-comite" src="/logo-comite.png" alt="Comitê de Manutenção JDI" />
          <div className="title-chip">COMITÊ DE MANUTENÇÃO • JDI</div>
          <img className="logo-femsa" src="/logo-femsa.png" alt="Coca-Cola FEMSA" />
        </div>
      </header>

      {/* Drawer */}
      <div className="drawer-overlay" style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }} onClick={() => setOpen(false)} />
      <aside className="drawer" style={{ transform: open ? "translateX(0)" : "translateX(-102%)" }}>
        <div className="drawer-header">
          <strong>Categorias</strong>
          <button onClick={() => setOpen(false)}>×</button>
        </div>
        <nav>
          {MENU.map(({ id, title, url, Icon }) => (
            <a key={id} href={url} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="drawer-link">
              <Icon /> <span>{title}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* One Pager */}
      <main className="banners-container">
        {erro ? (
          <div>Não foi possível carregar o carrossel.</div>
        ) : current ? (
          <div className="banner-dinamico" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <button className="nav-arrow nav-left" onClick={goPrev}>❮</button>
            <button className="nav-arrow nav-right" onClick={goNext}>❯</button>
            <img src={encodeURI(current)} alt={onePagers[bannerIndex]} />
          </div>
        ) : (
          <div>Carregando One Pagers...</div>
        )}
      </main>
    </div>
  );
}


