import React from "react";

type Props = React.SVGProps<SVGSVGElement> & { size?: number };

const Base = ({ size = 24, ...rest }: Props) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  />
);

/** 1) DDMs */
export const ChatIcon = (p: Props) => (
  <Base {...p}>
    <path d="M21 15a4 4 0 0 1-4 4H8l-4 3v-3a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h13a4 4 0 0 1 4 4z" />
    <path d="M7 8h10M7 12h7" />
  </Base>
);

/** 2) OKR / Fechamentos */
export const BarChartIcon = (p: Props) => (
  <Base {...p}>
    <path d="M3 3v18h18" />
    <rect x="6" y="10" width="3" height="7" rx="1" />
    <rect x="11" y="6" width="3" height="11" rx="1" />
    <rect x="16" y="12" width="3" height="5" rx="1" />
  </Base>
);

/** 3) Informativos */
export const InfoIcon = (p: Props) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 10v6M12 7h.01" />
  </Base>
);

/** 4) One Pager */
export const FileIcon = (p: Props) => (
  <Base {...p}>
    <path d


