import React from "react";

type Props = React.SVGProps<SVGSVGElement> & { size?: number };

// Base genérica para todos os ícones
const Base = ({ size = 28, ...rest }: Props) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  />
);

/* 1) DDMs – Balão de conversa */
export const ChatIcon = (p: Props) => (
  <Base {...p}>
    <path d="M21 15a4 4 0 0 1-4 4H8l-4 3v-3a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h13a4 4 0 0 1 4 4z" />
    <path d="M7 8h10M7 12h7" />
  </Base>
);

/* 2) OKR / Fechamentos – Gráfico de barras */
export const BarChartIcon = (p: Props) => (
  <Base {...p}>
    <path d="M3 3v18h18" />
    <rect x="6" y="10" width="3" height="7" rx="1" />
    <rect x="11" y="6" width="3" height="11" rx="1" />
    <rect x="16" y="12" width="3" height="5" rx="1" />
  </Base>
);

/* 3) Informativos – Círculo com ícone de informação */
export const InfoIcon = (p: Props) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 10v6M12 7h.01" />
  </Base>
);

/* 4) One Pager – Documento */
export const FileIcon = (p: Props) => (
  <Base {...p}>
    <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
    <path d="M14 2v5h5" />
    <path d="M9 13h6M9 17h6M9 9h3" />
  </Base>
);

/* 5) Papéis & Responsabilidades – Bússola */
export const CompassIcon = (p: Props) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <polygon points="14.5,9.5 11,13 9.5,14.5 11,11 14.5,9.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </Base>
);

/* 6) Treinamentos – Alvo */
export const TargetIcon = (p: Props) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <path d="M12 2v3M22 12h-3M12 22v-3M2 12h3" />
  </Base>
);

/* 7) Checklist Pós-Partida – Selo com Check */
export const CheckBadgeIcon = (p: Props) => (
  <Base {...p}>
    <path d="M8 3h8l3 4v6l-3 4H8l-3-4V7z" />
    <path d="M9.5 12l2 2 3.5-4" />
  </Base>
);

/* 8) Registro de Reuniões / Prestação – Pasta */
export const FolderIcon = (p: Props) => (
  <Base {...p}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </Base>
);

/* 9) Reconhecimentos – Medalha */
export const MedalIcon = (p: Props) => (
  <Base {...p}>
    <circle cx="12" cy="13" r="4" />
    <path d="M8 3l4 6 4-6" />
    <path d="M10 17l-2 4M14 17l2 4" />
  </Base>
);
