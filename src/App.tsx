// src/App.tsx  (JS/JSX puro — sem tipos)

export default function App() {
  // TROQUE os href pelos seus links reais
  const links = [
    { t: "DDM’s", d: "Documentos do DDM", href: "#" },
    { t: "Fechamentos (OKR)", d: "Pasta de Fechamentos", href: "#" },
    { t: "Informativos", d: "Comunicados e materiais", href: "#" },
    { t: "One Pager", d: "Materiais de uma página", href: "#" },
    { t: "Papéis & Responsabilidades", d: "Definições de responsabilidades", href: "#" },
    { t: "Treinamentos", d: "Materiais e trilhas", href: "#" },
  ];

  return (
    <>
      {/* ===== APP BAR ===== */}
      <header
        style={{
          display: "grid",
          gridTemplateColumns: "56px 1fr 56px",
          alignItems: "center",
          gap: 12,
          padding: "12px 16px",
          background: "#d71920",
          color: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        {/* Logo FEMSA (esquerda) */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          <img src="/logo-femsa.png" alt="FEMSA" style={{ width: 42, height: 28, objectFit: "contain" }} />
        </div>

        {/* Título central */}
        <h1
          style={{
            margin: 0,
            textAlign: "center",
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: 1.2,
          }}
        >
          Comitê de Manutenção • JDI
        </h1>

        {/* Logo Comitê (direita) */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <img src="/logo-comite-180.png" alt="Comitê" style={{ width: 36, height: 36, objectFit: "contain", borderRadius: "50%" }} />
        </div>
      </header>

      {/* ===== CONTEÚDO ===== */}
      <main
        style={{
          padding: "16px",
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

            <a
              href={l.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                background: "#d71920",
                color: "#fff",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: 10,
                fontWeight: 700,
              }}
            >
              Abrir
            </a>
          </article>
        ))}
      </main>
    </>
  );
}

