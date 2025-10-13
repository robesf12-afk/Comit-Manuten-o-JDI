import React from "react";

export default function App() {
  // Paleta fixa (claro)
  const colors = {
    brand: "#E30613",
    bg: "#f7f7f9",
    card: "#ffffff",
    text: "#111827",
    sub: "#6b7280",
    border: "#e5e7eb",
    pillBg: "#fff1f2",
    pillFg: "#e11d48",
    buttonBg: "#E30613",
    buttonFg: "#fff",
    navBg: "#ffffff",
    navBorder: "#e5e7eb",
    navFg: "#4b5563",
    navActive: "#111827",
  };

  const styles = {
    page: {
      fontFamily: "Inter, system-ui, Arial, sans-serif",
      color: colors.text,
      background: colors.bg,
      minHeight: "100vh",
      margin: 0,
      paddingBottom: "86px", // espaço para a bottom-nav
    } as React.CSSProperties,

    header: {
      background: colors.brand,
      color: "white",
      padding: "18px 16px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      boxShadow: "0 1px 0 rgba(0,0,0,.06)",
    } as React.CSSProperties,

    title: { fontSize: 22, fontWeight: 800, lineHeight: 1.1 } as React.CSSProperties,

    container: { maxWidth: 1100, margin: "0 auto", padding: "20px 16px 40px" } as React.CSSProperties,

    h2: { fontSize: 24, fontWeight: 800, margin: "12px 0 10px" } as React.CSSProperties,
    sub: { color: colors.sub, margin: "0 0 18px", fontSize: 15 } as React.CSSProperties,

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 16,
    } as React.CSSProperties,

    card: {
      background: colors.card,
      border: `1px solid ${colors.border}`,
      borderRadius: 14,
      padding: 16,
      display: "flex",
      flexDirection: "column" as const,
      gap: 14,
      boxShadow: "0 1px 1px rgba(0,0,0,.04)",
    } as React.CSSProperties,
    cardHead: { display: "flex", alignItems: "center", gap: 12 } as React.CSSProperties,
    pill: {
      width: 42,
      height: 42,
      borderRadius: 12,
      background: colors.pillBg,
      color: colors.pillFg,
      display: "grid",
      placeItems: "center",
      flexShrink: 0,
    } as React.CSSProperties,
    cardTitle: { fontSize: 17, fontWeight: 800 } as React.CSSProperties,
    cardDesc: { color: colors.sub, fontSize: 14, lineHeight: 1.45 } as React.CSSProperties,
    cardFooter: { marginTop: "auto" } as React.CSSProperties,
    button: {
      display: "inline-block",
      background: colors.buttonBg,
      color: colors.buttonFg,
      border: 0,
      borderRadius: 10,
      padding: "10px 16px",
      fontWeight: 800,
      cursor: "pointer",
      textDecoration: "none",
    } as React.CSSProperties,

    bottomNav: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      background: colors.navBg,
      borderTop: `1px solid ${colors.navBorder}`,
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      height: "66px",
      paddingBottom: "env(safe-area-inset-bottom)", // iOS
      zIndex: 50,
    } as React.CSSProperties,
    navItem: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      color: colors.navFg,
      textDecoration: "none",
      fontSize: 11,
      fontWeight: 700,
    } as React.CSSProperties,
    navItemActive: { color: colors.navActive } as React.CSSProperties,
  };

  const Icons = {
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 7h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" opacity=".2"/>
        <path d="M7 7V5a5 5 0 0 1 10 0v2" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <rect x="3" y="7" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7"/>
      </svg>
    ),
    home: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>
      </svg>
    ),
    docs: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <path d="M14 2v6h6"/>
        <path d="M16 13H8M16 17H8M10 9H8"/>
      </svg>
    ),
    okr: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/>
        <path d="M19 9l-5 5-3-3-4 4"/>
      </svg>
    ),
    checklist: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/>
        <path d="M2 12h6M2 18h6"/>
      </svg>
    ),
    info: (
      <svg width="22" height="22" viewBox="0 0 24 24"
