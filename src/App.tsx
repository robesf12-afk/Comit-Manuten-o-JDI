import React from "react";

/** ============ ÍCONES (inline) ============ */
type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };
const BaseIcon = ({ size = 28, ...rest }: IconProps) => (
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

const ChatIcon = (p: IconProps) => (
  <BaseIcon {...p}>
    <path d="M21 15a4 4 0 0 1-4 4H8l-4 3v-3a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h13a4 4 0 0 1 4 4z" />
    <path d="M7 8h10M7 12h7" />
  </BaseIcon>
);

const BarChartIcon = (p: IconProps) => (
  <BaseIcon {...p}>
    <path d="M3 3v18h18" />
    <rect x="6" y="10" width="3" height="7" rx="1" />
    <rect x="11" y="6" width="3" height="11" rx="1" />
    <rect x="16" y="12" width="3" height="5" rx="1" />
  </BaseIcon>
);

const InfoIcon = (p: IconProps) =>
