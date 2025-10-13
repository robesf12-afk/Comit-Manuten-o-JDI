
   import React from "react";

/* ======= ÍCONES (SVG leves) ======= */
const R = "#E30613";
const IconFolder = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3 6h5l2 2h11v10a2 2 0 0 1-2 2H3V6z" stroke={R} strokeWidth="1.6"/>
  </svg>
);
const IconDoc = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M7 3h7l5 5v13H7z" stroke={R} strokeWidth="1.6"/>
    <path d="M14 3v5h5" stroke={R} strokeWidth="1.6"/>
  </svg>
);
const IconInfo = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={R} strokeWidth="1.6"/>
    <path d="M12 7.5v.5m0 3v6" stroke={R} strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const IconPlay = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={R} strokeWidth="1.6"/>
    <path d="M10 8l6 4-6 4V8z" fill={R}/>
  </svg>
);
const IconCheck = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={R} strokeWidth="1.6"/>
    <path d="M8 12l3 3 5-6" stroke={R} strokeWidth="1.6"/>
  </svg>
);

/* ======= DADOS ======= */
type Link = { t: string; d: string; href: string; icon: React.ReactNode };

const links: Link[] = [
  { t: "DDM’s", d: "Documentos do DDM", href: "https://seu-sharepoint/ddm", icon: IconFolder },
  { t: "Fechamentos (OKR)", d: "Pasta de Fechamentos", href: "https://seu-sharepoint/fechamentos", icon: IconDoc },
  { t: "Informativos", d: "Comunicados e materiais", href: "https://seu-sharepoint/informativos", icon: IconInfo },
  { t: "One Pager", d: "Materiais de uma página", href: "https://seu-sharepoint/onepager", icon: IconDoc },
  { t: "Papéis & Responsabilidades", d: "Definições de responsabilidades", href: "https://seu-sharepoint/papeis", icon: IconDoc },
  { t: "Treinamentos", d: "Materiais e trilhas", href: "https://seu-sharepoint/treinamentos", icon: IconPlay },
  { t: "Checklist Pós-Partida", d: "Abrir formulário com prefill", href: "https://forms.office.com/seu-checklist-1", icon: IconCheck },
  { t: "Registro de Abertura / Prestação de Contas", d: "Abrir formulário com prefill", href: "https://forms.office.com/seu-checklist-2", icon: IconCheck }
];

/* Atalhos do rodapé (escolha 4–5 principais) */
const quickActions: { label: string; icon: React.ReactNode; href: string }[] = [
  { label: "DDM",           icon: IconFolder, href: "https://seu-sharepoint/ddm" },
  { label: "OKR",           icon: IconDoc,    href: "https://seu-sharepoint/fechamentos" },
  { label: "Info",          icon: IconInfo,   href: "https://seu-sharepoint/informativos" },
  { label: "Train",         icon: IconPlay,   href: "https://seu-sharepoint/treinamentos" },
  { label: "Check",         icon: IconCheck,  href: "https://forms.office.com/seu-checklist-1" }
];

export default function App() {
  return (
    <>
      <style>{`
        :root { --brand:#E30613; --surface:#fff; --text:#111827; --muted:#6b7280; --border:#f1f5f9; }
        .wrap{max-width:1120px;margin:0 auto;padding:24px}
        .header{display:flex;align-items:center;gap:12px;margin-bottom:16px}
        .logo{width:32px;height:32px;object-fit:contain}
        h1{font-size:clamp(20px,3vw,28px);margin:0;font-weight:700}
        .sub{color:var(--muted);margin:6px 0 18px}

        .grid{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
        .card{background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px;display:flex;gap:10px;flex-direction:column;transition:box-shadow .15s,transform .08s}
        .card:hover{box-shadow:0 6px 18px rgba(0,0,0,.06);transform:translateY(-1px)}
        .title{display:flex;align-items:center;gap:10px;font-weight:700}
        .desc{color:var(--muted);font-size:14px;line-height:1.4}
        .btn{margin-top:auto;align-self:flex-start;background:var(--brand);color:#fff;border:none;border-radius:10px;padding:10px 16px;font-weight:700;cursor:pointer}
        .btn:active{transform:translateY(1px)}

        /* ==== TAB BAR (só em tela*
 

   
       
