// src/App.tsx
import React, { useState, useEffect } from "react";
import {
  IconOKR,
  IconDDM,
  IconOnePager,
  IconTreinamentos,
  IconPapeis,
  IconInfo,
  IconChecklist,
  IconRegistroPCM,
  IconReconhecimentos,
} from "./icons";

/* LINKS das pastas/banners */
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
};

/* Itens do menu lateral */
const MENU = [
  { id: "okr", title: "OKR de Manutenção", Icon: IconOKR, url: LINKS.okr },
  { id: "ddm", title: "DDM’s", Icon: IconDDM, url: LINKS.ddm },
  { id: "onepager", title: "One Pager", Icon: IconOnePager, url: LINKS.onepager },
  { id: "treinamentos", title: "Treinamentos", Icon: IconTreinamentos, url: LINKS.treinamentos },
  { id: "papeis", title: "Papéis e Responsabilidades", Icon: IconPapeis, url: LINKS.papeis },
  { id: "informativos", title: "Informativos", Icon: IconInfo, url: LINKS.informativos },
  { id: "checklist", title: "Checklist Pós-Partida", Icon: IconChecklist, url: LINKS.checklist },
  { id: "registro", title: "Registro de Reuniões / PCM", Icon: IconRegistroPCM, url: LINKS.registro },
  { id: "reconhecimentos", title: "Reconhecimentos", Icon: IconReconhecimentos, url: LINKS.reconhecimentos },
];

/* Banners principais */
const BANNERS = [
  { id: "okr", img: "/banner-okr.png", url: LINKS.okr },
  { id: "ddm", img: "/banner-ddm.png", url: LINKS.ddm },
  { id: "onepager", img: "/banner-onepager.png", url: LINKS.onepager },
  { id: "reconhecimentos", img: "/banner-reconhecimentos.png", url: LINKS.reconhecimentos },
];

export default function App() {
  const [open, setOpen] = useState(false);

  // travar scroll quando o menu está aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <div className="app">
      {/* Botão flutuante (menu) */}
      <button className="fab-left" onClick={() => setOpen(true)}>
        <span className="bar" /><span className="bar" /><span className="bar" />
      </button>

      {/* Overlay + Drawer */}
      <div className={`drawer-overlay ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`drawer ${open ? "open" : ""}`}>
        <div className="drawer-header">
          <strong>Categorias</strong>
          <button className="drawer-close" onClick={() => setOpen(false)}>×</button>
        </div>

        <nav className="drawer-nav">
          {MENU.map(({ id, title, url, Icon }) => (
            <a key={id} href={url} target="_blank" rel="noopener noreferrer" className="drawer-link">
              <Icon /><span>{title}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Conteúdo: apenas banners */}
      <main className="banners-container">
        {BANNERS.map(({ id, img, url }) => (
          <a key={id} href={url} target="_blank" rel="noopener noreferrer">
            <img className="banner" src={img} alt={id} />
          </a>
        ))}
      </main>
    </div>
  );
}
