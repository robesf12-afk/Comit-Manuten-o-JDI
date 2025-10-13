// src/App.tsx — logos menores e título maior, sem dark mode

export default function App() {
  // coloque seus links reais aqui
  const links = [
    { t: "DDM’s", d: "Documentos do DDM", href: "#" },
    { t: "Fechamentos (OKR)", d: "Pasta de Fechamentos", href: "#" },
    { t: "Informativos", d: "Comunicados e materiais", href: "#" },
    { t: "One Pager", d: "Materiais de uma página", href: "#" },
    { t: "Papéis & Responsabilidades", d: "Definições de responsabilidades", href: "#" },
    { t: "Treinamentos", d: "Materiais e trilhas", href: "#" },
  ];

  // altura da barra e dos logos
  const BAR_H = 56;
  const LOGO_H = 22;     // altura FEMSA
  const LOGO_R_H = 26;   // altura logo do Comitê (direita)

  return (
    <>
      {/* ===== APP BAR ===== */}
      <header
        style={{
          display: "grid",
          gridTemplateColumns: "40px 1fr 40px", // colunas mais estreitas para os logos
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          background: "#d71920",
          color: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 10,
          height: BAR_H,
          boxSizing: "border-box",
        }}
      >
        {/* Logo FEMSA (esquerda) — altura fixa pequena */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          <img
            src="/logo-femsa.png?v=2"        // ?v=2 ajuda a burlar cache do PWA
            alt="FEMSA"
            style={{ height: LOGO_H, width: "auto", objectFit: "contain", display: "block" }}
          />
        </div>

        {/* Título central (um pouco maior) */}
        <h1
          style={{
            margin: 0,
            textAlign: "center",
            fontWeight: 800,
            fontSize: 18,          // se quiser maior, suba para 20
            lineHeight: 1.1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title="Comitê de Manutenção • JDI"
        >
          Comitê de Manutenção • JDI
        </h1>

        {/* Logo do Comitê (direita) — altura fixa pequena */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <img
            src="/logo-comite-180.png?v=2"
            alt="Comitê"
            style={{ height: LOGO_R_H, width: "auto", objectFit: "contain", display: "block" }}
          />
        </div>
      </header>

      {/* ===== CONTEÚDO ===== */}
      <main
        style={{
          padding: 16,
          display: "grid",
          gap: 16,
          gridTemplateColumns: "1fr",
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        {links.map((l) => (
          <article
            key={l.t}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 16,
              boxShadow: "0 1px 2px rgba(0,0,0,.06)",
              border: "1px solid #eee",
            }}
          >
            <h2 style={{ margin: "0 0 6px 0", fontSize: 18, fontWeight: 700, color: "#111" }}>{l.t}</h2>
            <p style={{ margin: "0 0 12px 0", color: "#555" }}>{l.d}</p>
