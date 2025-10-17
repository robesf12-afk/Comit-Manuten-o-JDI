
 import React from "react";

/**
 * Ícones no estilo Fluent/iOS, inspirados no app da Livelo,
 * com paleta Coca (duotone discreto).
 */
const STROKE = "#B30000";   // vermelho Coca
const FILL_SOFT = "#FFE5E5"; // vermelho bem clarinho
const ACCENT = "#D00000";    // acento

type Props = React.SVGProps<SVGSVGElement> & { size?: number };

function SvgBase({ size = 28, children, ...rest }: Props & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false" {...rest}>
      {children}
    </svg>
  );
}

/** 1) DDMs (diálogo) */
export function IconDDM({ size, ...rest }: Props) {
  return (
    <SvgBase size={size} {...rest}>
      <path d="M3 11a6 6 0 1 1 10.8 3.6L15 19l-4.4-1.2A6 6 0 0 1 3 11Z" fill={FILL_SOFT}/>
      <path d="M3 11a6 6 0 1 1 10.8 3.6L15 19l-4.4-1.2A6 6 0 0 1 3 11Z" fill="none" stroke={STROKE} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7.7" cy="11" r="0.9" fill={ACCENT}/>
      <circle cx="10.3" cy="11" r="0.9" fill={ACCENT}/>
    </SvgBase>
  );
}

/** 2) OKR / Fechamentos */
export function IconOKR({ size, ...rest }: Props) {
  return (
    <SvgBase size={size} {...rest}>
      <circle cx="12" cy="12" r="9" fill={FILL_SOFT}/>
      <circle cx="12" cy="12" r="9" fill="none" stroke={STROKE} strokeWidth={1.8}/>
      <path d="M7 13.5l3-3 2.5 2.5 4-4" fill="none" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    </SvgBase>
  );
}

/** 3) Informativos */
export function IconInfo({ size, ...rest }: Props) {
  return (
    <SvgBase size={size} {...rest}>
      <rect x="4" y="3.5" width="16" height="17" rx="3.5" fill={FILL_SOFT}/>
      <rect x="4" y="3.5" width="16" height="17" rx="3.5" fill="none" stroke={STROKE} strokeWidth={1.8}/>
      <circle cx="12" cy="8" r="1.1" fill={ACCENT}/>
      <path d="M11 11.5h2V17h-2" stroke={STROKE} strokeWidth={1.8} strokeLinecap="round"/>
    </SvgBase>
  );
}

/** 4) One Pager (documento) */
export function IconOnePager({ size, ...rest }: Props) {
  return (
    <SvgBase size={size} {...rest}>
      <path d="M7 3.5h6l4 4V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z" fill={FILL_SOFT}/>
      <path d="M13 3.5v4h4" fill="none" stroke={STROKE} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 12h7M8.5 15h5" stroke={STROKE} strokeWidth={1.8} strokeLinecap="round"/>
    </SvgBase>
  );
}

/** 5) Papéis & Responsabilidades (bússola) */
export function IconPapeis({ size, ...rest }: Props) {
  return (
    <SvgBase size={size} {...rest}>
      <circle cx="12" cy="12" r="9" fill={FILL_SOFT}/>
      <circle cx="12" cy="12" r="9" fill="none" stroke={STROKE} strokeWidth={1.8}/>
      <path d="M12 7l3 5-5 3 2-8Z" fill={ACCENT} opacity={0.9}/>
      <circle cx="12" cy="12" r="1" fill="#fff"/>
    </SvgBase>
  );
}

/** 6) Treinamentos (alvo) */
export function IconTreinamentos({ size, ...rest }: Props) {
  return (
    <SvgBase size={size} {...rest}>
      <circle cx="12" cy="12" r="9" fill={FILL_SOFT}/>
      <circle cx="12" cy="12" r="6" fill="none" stroke={STROKE} strokeWidth={1.8}/>
      <circle cx="12" cy="12" r="3" fill={ACCENT}/>
      <path d="M18 6l-3 3" stroke={STROKE} strokeWidth={1.8} strokeLinecap="round"/>
    </SvgBase>
  );
}

/** 7) Checklist Pós-Partida */
export function IconChecklist({ size, ...rest }: Props) {
  return (
    <SvgBase size={size} {...rest}>
