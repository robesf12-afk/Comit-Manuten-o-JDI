import React from "react";

const STROKE = "#B30000";
const FILL_SOFT = "#FFE5E5";
const ACCENT = "#D00000";

type Props = React.SVGProps<SVGSVGElement> & { size?: number };

function SvgBase({ size = 28, children, ...rest }: Props & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false" {...rest}>
      {children}
    </svg>
  );
}

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
export function IconOKR({ size, ...rest }: Props) {
  return (
    <SvgBase size={size} {...rest}>
      <circle cx="12" cy="12" r="9" fill={FILL_SOFT}/>
      <circle cx="12" cy="12" r="9" fill="none" stroke={STROKE} strokeWidth={1.8}/>
      <path d="M7 13.5l3-3 2.5 2.5 4-4" fill="none" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    </SvgBase>
  );
}
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
export function IconOnePager({ size, ...rest }: Props) {
  return (
    <SvgBase size={size} {...rest}>
      <path d="M7 3.5h6l4 4V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z" fill={F
