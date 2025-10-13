import React from "react";

/** ---------- ÍCONES EM SVG (sem libs) ---------- */
function Icon({ name, size = 28 }: { name: string; size?: number }) {
  const common = { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

  switch (name) {
    case "docs": // DDMs
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8M16 17H8M10 9H8" />
        </svg>
      );
    case "folder": // Fechamentos
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M3 7h5l2 2h11v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="M3 7V5a2 2 0 0 1 2-2h4l2 2h6" />
        </svg>
      );
    case "megaphone": // Informativos
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M3 11v2a1 1 0 0 0 1 1h2l5 3V7l-5 3H4a1 1 0 0 0-1 1z" />
          <path d="M16 8a5 5 0 0 1 0 8" />
        </svg>
      );
    case "page": // One Pager
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9z" />
          <path d="M14 2v7h7" />
          <path d="M9 13h6M9 17h6" />
        </svg>
      );
    case "shield": // Papéis & Responsabilidades
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "cap": // Treinamentos
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M22 10l-10-4-10 4 10 4 10-4z" />
          <path d="M6 12v5a10 10 0 0 0 12 0v-5" />
        </svg>
      );
    case "checklist": // Checklist
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M9 11l2 2 4-4" />
          <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
          <path d="M8 7h8M8 15h8" />
        </svg>
      );
    case "clipboard": // Registro/Atas
      return (
        <svg {...common} viewBox="0 0 24 24">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M9 3h6v3H9zM8 10h8M8 14h8" />
        </svg>
      );
    default:
      return null;
  }
}

/** ---------- LINKS (substitua os href pelos seus) ---------- */
type Link = { icon: string; title: string; desc: string; href: string };

const links: Link[] = [
  { icon: "docs",  title: "DDM’s",                         desc: "Documentos do DDM",                                  href: "PASTE_URL_DDMS" },
  { icon: "folder",title: "Fechamentos (OKR)",             desc: "Pasta de Fechamentos",                               href: "PASTE_URL_FECHAMENTOS" },
  { icon: "megaphone", title: "Informativos",              desc: "Comunicados e materiais",                            href: "PASTE_URL_INFORMATIVOS" },
  { icon: "page",  title: "One Pager",                      desc: "Materiais de uma página",                            href: "PASTE_URL_ONEPAGER" },
  { icon: "shield",title: "Papéis & Responsabilidades",     desc: "Definições de responsabilidades",                   href: "PASTE_URL_PAPEIS" },
  { icon: "cap",   title: "Treinamentos",                   desc: "Materiais e trilhas",                                href: "PASTE_URL_TREINAMENTOS" },
  { icon: "checklist", title: "Checklist Pós-Partida CIP/SETUP/PCM/Grandes Manutenções (Forms)", desc: "Abrir formulário com prefill", href: "PASTE_URL_CHECKLIST_POS" },
  { icon: "clipboard", title: "Registro de Reuniões de Abertura de PCM e Prestação de Contas (Forms)", desc: "Abrir formulário com prefill", href: "PASTE_URL_REGISTRO" },
];

/** ---------- ESTILOS (branco, limpo) ---------- */
const css = {
  page: { fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif", background: "#fff", color: "#222", margin: 0 as const },
  container: { maxWidth: 1120, margin: "0 auto", padding: "24px 16px" },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    borderBottom: "1px solid #eee",
    paddingBottom: 12,
    marginBottom: 20,
  },
  logo: { height: 22 },
  title: { fontSize: 20, fontWeight: 700 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 16,
  },
  card: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 12,
    padding: 16,
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
  },
  cardHeader: { display: "flex", alignItems: "center", gap: 10 },
  cardTitle: { margin: 0, fontSize: 18, fontWeight: 700, lineHeight: 1.2 },
  cardDesc: { margin: 0, color: "#555" },
  actions: { marginTop: "auto", display: "flex", justifyContent: "flex-start" },
  btn: {
    appearance: "none" as const,
    border: "none",
    background: "#E30613",
    color: "#fff",
    fontWeight: 700,
    padding: "10px 16px",
    borderRadius: 10,
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  },
  footer: { marginTop: 28, color: "#666", fontSize: 12, textAlign: "center" as const },
};

export default function App() {
  return (
    <div style={css.page}>
      <main style={css.container}>
        <header style={css.header}>
          {/* Se quiser, troque pelo seu PNG (mantendo branco): */}
          <img src="/logo-femsa.png" alt="FEMSA" style={css.logo} />
          <div style={css.title}>Comitê de Manutenção • JDI</div>
        </header>

        <section style={{ marginBottom: 8 }}>
          <h2 style={{ fontSize: 24, margin: "0 0 8px" }}>Acesso rápido</h2>
          <p style={{ margin: "0 0 20px", color: "#555" }}>
            Atalhos para pastas do SharePoint e formulários do Forms.
          </p>
        </section>

        <section style={css.grid}>
          {links.map((l) => (
            <article key={l.title} style={css.card}>
              <div style={css.cardHeader}>
                <div style={{ color: "#E30613" }}>
                  <Icon name={l.icon} size={28} />
                </div>
                <h3 style={css.cardTitle}>{l.title}</h3>
              </div>
              <p style={css.cardDesc}>{l.desc}</p>
              <div style={css.actions}>
                <a href={l.href} target="_blank" rel="noreferrer" style={css.btn}>
                  Abrir
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </section>

        <footer style={css.footer}>
          © {new Date().getFullYear()} Comitê de Manutenção — FEMSA
        </footer>
      </main>
    </div>
  );
}

