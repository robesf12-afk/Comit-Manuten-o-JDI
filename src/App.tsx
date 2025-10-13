export default function App() {
  // Paleta e estilos reaproveitados
  const colors = {
    brand: "#E30613",
    bg: "#f7f7f9",
    text: "#111827",
    sub: "#6b7280",
    border: "#e5e7eb",
    pillBg: "#fff1f2",
    pillFg: "#e11d48",
  };

  const styles = {
    page: {
      fontFamily: "Inter, system-ui, Arial, sans-serif",
      color: colors.text as const,
      background: colors.bg,
      minHeight: "100vh",
      margin: 0,
    },
    header: {
      background: colors.brand,
      color: "white",
      padding: "18px 16px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      boxShadow: "0 1px 0 rgba(0,0,0,.06)",
    },
    title: { fontSize: 22, fontWeight: 800, lineHeight: 1.1 },
    container: { maxWidth: 1100, margin: "0 auto", padding: "20px 16px 40px" },
    h2: { fontSize: 24, fontWeight: 800, margin: "12px 0 10px" },
    sub: { color: colors.sub, margin: "0 0 18px", fontSize: 15 },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 16,
    },

    card: {
      background: "white",
      border: `1px solid ${colors.border}`,
      borderRadius: 14,
      padding: 16,
      display: "flex",
      flexDirection: "column" as const,
      gap: 14,
      boxShadow: "0 1px 1px rgba(0,0,0,.04)",
    },
    cardHead: { display: "flex", alignItems: "center", gap: 12 },
    pill: {
      width: 42,
      height: 42,
      borderRadius: 12,
      background: colors.pillBg,
      color: colors.pillFg,
      display: "grid",
      placeItems: "center",
      flexShrink: 0,
    },
    cardTitle: { fontSize: 17, fontWeight: 800 },
    cardDesc: { color: colors.sub, fontSize: 14, lineHeight: 1.45 },
    cardFooter: { marginTop: "auto" },
    button: {
      display: "inline-block",
      background: colors.brand,
      color: "white",
      border: 0,
      borderRadius: 10,
      padding: "10px 16px",
      fontWeight: 800,
      cursor: "pointer",
    },
  };

  // Ícones (SVG inline — leve e sem dependências)
  const Icons = {
    docs: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <path d="M14 2v6h6"/>
        <path d="M16 13H8"/>
        <path d="M16 17H8"/>
        <path d="M10 9H8"/>
      </svg>
    ),
    okr: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/>
        <path d="M19 9l-5 5-3-3-4 4"/>
      </svg>
    ),
    info: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4"/>
        <path d="M12 8h.01"/>
      </svg>
    ),
    onepager: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2"/>
        <path d="M7 8h10M7 12h10M7 16h6"/>
      </svg>
    ),
    roles: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4"/>
        <path d="M5.5 21a6.5 6.5 0 0 1 13 0"/>
      </svg>
    ),
    train: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="14" rx="2"/>
        <path d="M7 21l3-3h4l3 3"/>
      </svg>
    ),
    checklist: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/>
        <path d="M2 12h6"/>
        <path d="M2 18h6"/>
      </svg>
    ),
    meeting: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="3"/>
        <circle cx="16" cy="8" r="3"/>
        <path d="M2 21a6 6 0 0 1 12 0"/>
        <path d="M14 21a6 6 0 0 1 8-5.5"/>
      </svg>
    ),
  };

  // Cards (edite t/d/href quando quiser)
  const links = [
    {
      t: "DDM’s",
      d: "Documentos do DDM",
      href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/...",
      icon: Icons.docs,
    },
    {
      t: "Fechamentos (OKR)",
      d: "Pasta de Fechame
