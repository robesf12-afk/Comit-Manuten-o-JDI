import { useEffect, useMemo, useState } from "react";

export default function App() {
  // --- Dark mode (segue o sistema e atualiza ao vivo) ---
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-color-scheme: dark)").matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    const handler = (ev: MediaQueryListEvent) => setIsDark(ev.matches);
    mq?.addEventListener?.("change", handler);
    return () => mq?.removeEventListener?.("change", handler);
  }, []);

  // --- Paletas (light/dark) ---
  const colors = useMemo(
    () =>
      isDark
        ? {
            brand: "#E30613",
            bg: "#0b0c0f",
            card: "#121319",
            text: "#f8fafc",
            sub: "#9aa3ad",
            border: "#1f222a",
            pillBg: "#1d0b0c",
            pillFg: "#ff5f7d",
            buttonBg: "#E30613",
            buttonFg: "#fff",
            navBg: "#0b0c0f",
            navBorder: "#1f222a",
            navFg: "#dbe2ea",
            navActive: "#fff",
          }
        : {
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
          },
    [isDark]
  );

  // --- Estilos ---
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
      boxShadow: isDark ? "0 1px 0 rgba(0,0,0,.2)" : "0 1px 0 rgba(0,0,0,.06)",
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
      boxShadow: isDark ? "0 1px 1px rgba(0,0,0,.3)" : "0 1px 1px rgba(0,0,0,.04)",
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

    // bottom nav
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

  // Ícones (reaproveitamos os do card + alguns extras p/ nav)
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4M12 8h.01"/>
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
    meeting: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="3"/>
        <circle cx="16" cy="8" r="3"/>
        <path d="M2 21a6 6 0 0 1 12 0"/>
        <path d="M14 21a6 6 0 0 1 8-5.5"/>
      </svg>
    ),
  };

  // --- Cards (ajuste títulos/descrições/links à vontade) ---
  const links = [
    { id: "ddms",      t: "DDM’s", d: "Documentos do DDM", href: "https://cocacolafemsa-my.sharepoint.com/...", icon: Icons.docs },
    { id: "okr",       t: "Fechamentos (OKR)", d: "Pasta de Fechamentos", href: "https://cocacolafemsa-my.sharepoint.com/...", icon: Icons.okr },
    { id: "info",      t: "Informativos", d: "Comunicados e materiais", href: "https://cocacolafemsa-my.sharepoint.com/...", icon: Icons.info },
    { id: "onepager",  t: "One Pager", d: "Materiais de uma página", href: "https://cocacolafemsa-my.sharepoint.com/...", icon: Icons.onepager },
    { id: "roles",     t: "Papéis & Responsabilidades", d: "Definições de responsabilidades", href: "https://cocacolafemsa-my.sharepoint.com/...", icon: Icons.roles },
    { id: "train",     t: "Treinamentos", d: "Materiais e trilhas", href: "https://cocacolafemsa-my.sharepoint.com/...", icon: Icons.train },
    { id: "chk1",      t: "Checklist Pós-Partida CIP/SETUP/PCM/Grandes Manutenções (Forms)", d: "Abrir formulário com prefill", href: "https://forms.office.com/Pages/...", icon: Icons.checklist },
    { id: "chk2",      t: "REGISTRO DE REUNIÕES DE ABERTURA DE PCM E PRESTAÇÃO DE CONTAS (Forms)", d: "Abrir formulário com prefill", href: "https://forms.office.com/Pages/...", icon: Icons.meeting },
  ];

  // --- seção fixa para "Home" (anchor) ---
  const sections = {
    home: "home",
    ddms: "ddms",
    okr: "okr",
    check: "check",
  };

  // Para nav ativa (bem simples: considera a hash atual)
  const [hash, setHash] = useState<string>(() => window.location.hash || "#home");
  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "#home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // helpers
  const NavLink = ({
    href,
    icon,
    label,
  }: {
    href: string;
    icon: React.ReactNode;
    label: string;
  }) => {
    const active = hash === href;
    return (
      <a href={href} style={{ ...styles.navItem, ...(active ? styles.navItemActive : {}) }}>
        {icon}
        <span>{label}</span>
      </a>
    );
  };

  // agrupando cards por “blocos” usados na bottom nav
  const group = {
    ddms: links.filter((l) => l.id === "ddms"),
    okr: links.filter((l) => l.id === "okr"),
    check: links.filter((l) => l.id === "chk1" || l.id === "chk2"),
    others: links.filter((l) => !["ddms", "okr", "chk1", "chk2"].includes(l.id)),
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <img src="/logo-femsa.png" alt="FEMSA" style={{ height: 28 }} />
        <div style={styles.title}>Comitê de Manutenção • JDI</div>
      </header>

      {/* HOME */}
      <main id={sections.home} style={styles.container}>
        <h2 style={styles.h2}>Acesso rápido</h2>
        <p style={styles.sub}>Atalhos para pastas do SharePoint e checklists do Forms.</p>

        {/* Principais */}
        <section id={sections.ddms} style={{ marginTop: 18 }}>
          <h3 style={{ ...styles.h2, fontSize: 18 }}>DDM’s</h3>
          <div style={styles.grid}>
            {group.ddms.map((l) => (
              <Card key={l.t} l={l} styles={styles} />
            ))}
          </div>
        </section>

        <section id={sections.okr} style={{ marginTop: 18 }}>
          <h3 style={{ ...styles.h2, fontSize: 18 }}>Fechamentos (OKR)</h3>
          <div style={styles.grid}>
            {group.okr.map((l) => (
              <Card key={l.t} l={l} styles={styles} />
            ))}
          </div>
        </section>

        {/* Outros atalhos */}
        <section style={{ marginTop: 18 }}>
          <h3 style={{ ...styles.h2, fontSize: 18 }}>Outros</h3>
          <div style={styles.grid}>
            {group.others.map((l) => (
              <Card key={l.t} l={l} styles={styles} />
            ))}
          </div>
        </section>

        {/* Checklists */}
        <section id={sections.check} style={{ marginTop: 18 }}>
          <h3 style={{ ...styles.h2, fontSize: 18 }}>Checklists</h3>
          <div style={styles.grid}>
            {group.check.map((l) => (
              <Card key={l.t} l={l} styles={styles} />
            ))}
          </div>
        </section>
      </main>

      {/* BOTTOM NAV */}
      <nav style={styles.bottomNav} aria-label="Navegação">
        <NavLink href="#home" icon={Icons.home} label="Home" />
        <NavLink href="#ddms" icon={Icons.docs} label="DDM’s" />
        <NavLink href="#okr" icon={Icons.okr} label="OKR" />
        <NavLink href="#check" icon={Icons.checklist} label="Checklists" />
      </nav>
    </div>
  );
}

// --- Card isolado para ficar mais limpo ---
function Card({ l, styles }: any) {
  return (
    <article style={styles.card}>
      <div style={styles.cardHead}>
        <div style={styles.pill}>{l.icon}</div>
        <div style={styles.cardTitle}>{l.t}</div>
      </div>
      <p style={styles.cardDesc}>{l.d}</p>
      <div style={styles.cardFooter}>
        <a href={l.href} target="_blank" rel="noopener noreferrer" style={styles.button}>
          Abrir
        </a>
      </div>
    </article>
  );
}
