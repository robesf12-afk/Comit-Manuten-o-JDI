import React from "react";

/**
 * Ícones estilo Fluent/iOS com paleta Coca.
 * Sem dependências externas.
 */
const STROKE = "#B30000";    // vermelho Coca
const FILL_SOFT = "#FFE5E5"; // vermelho clarinho
const ACCENT = "#D00000";    // acento

type Props = React.SVGProps<SVGSVGElement> & { size?: number };

function SvgBase({
  size = 28,
  children,
  ...rest
}: Props & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

/** Documento (Abertura) */
export function IconDoc({ size, ...rest }: Props) {
  return (
    <SvgBase size={size} {...rest}>
      <path
        d="M7 3.5h6l4 4V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z"
        fill={FILL_SOFT}
      />
      <path
        d="M13 3.5v4h4"
        fill="none"
        stroke={STROKE}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12h7M8.5 15h5"
        stroke={STROKE}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </SvgBase>
  );
}

/** Partida (seta) */
export function IconPartida({ size, ...rest }: Props) {
  return (
    <SvgBase size={size} {...rest}>
      <circle cx="12" cy="12" r="9" fill={FILL_SOFT} />
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke={STROKE}
        strokeWidth={1.8}
      />
      <path
        d="M8 12h5.5m0 0l3-3m-3 3l3 3"
        stroke={ACCENT}
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgBase>
  );
}

/** Checklist pós-partida (check) */
export function IconChecklist({ size, ...rest }: Props) {
  return (
    <SvgBase size={size} {...rest}>
      <rect
        x="4"
        y="3.5"
        width="16"
        height="17"
        rx="2.5"
        fill={FILL_SOFT}
      />
      <rect
        x="4"
        y="3.5"
        width="16"
        height="17"
        rx="2.5"
        fill="none"
        stroke={STROKE}
        strokeWidth={1.8}
      />
      <path
        d="M8 12l2.2 2.2L16 8.6"
        fill="none"
        stroke={ACCENT}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgBase>
  );
}

/** Fechamentos / OKR (gráfico/ok) */
export function IconOKR({ size, ...rest }: Props) {
  return (
    <SvgBase size={size} {...rest}>
      <circle cx="12" cy="12" r="9" fill={FILL_SOFT} />
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke={STROKE}
        strokeWidth={1.8}
      />
      <path
        d="M7 13.5l3-3 2.5 2.5 4-4"
        fill="none"
        stroke={ACCENT}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgBase>
  );
}

/** DDMs (balão de conversa) */
export function IconDDM({ size, ...rest }: Props) {
  return (
    <SvgBase size={size} {...rest}>
      <path
        d="M3 11a6 6 0 1 1 10.8 3.6L15 19l-4.4-1.2A6 6 0 0 1 3 11Z"
        fill={FILL_SOFT}
      />
      <path
        d="M3 11a6 6 0 1 1 10.8 3.6L15 19l-4.4-1.2A6 6 0 0 1 3 11Z"
        fill="none"
        stroke={STROKE}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinej
