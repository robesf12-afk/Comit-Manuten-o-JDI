export default function App() {
  const links = [
    { t: "DDM’s", d: "Documentos do DDM", href: "#" },
    { t: "Fechamentos (OKR)", d: "Pasta de Fechamentos", href: "#" },
    { t: "Informativos", d: "Comunicados e materiais", href: "#" },
    { t: "One Pager", d: "Materiais de uma página", href: "#" },
    { t: "Papéis & Responsabilidades", d: "Definições de responsabilidades", href: "#" },
    { t: "Treinamentos", d: "Materiais e trilhas", href: "#" },
  ];

  const BAR_H = 56;
  const LOGO_H = 22;    // FEMSA (esquerda)
  const LOGO_R_H = 26;  // Comitê (direita)

  return (
    <>
      <header
        style={{
          display: "grid",
          gridTemplateColumns: "40px 1fr 40px",
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo-femsa.png?v=4"
            alt="FEMSA"
            style={{ height: LOGO_H, width: "auto", objectFit: "contain", display: "block" }}
          />
        </div>

        <h1
          style={{
            margin: 0,
            textAlign: "center",
            fontWeight: 800,
            fontSize: 18,
            lineHeight: 1.1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title="Comitê de Manutenção • JDI"
        >
          Comitê de Manutenção • JDI
        </h1>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <img
            src="/logo-comite-180.png?v=4"
            alt="Comitê"
            style={{ height: LOGO_R_H, width: "auto", objectFit: "contain", display: "block" }}
          />
        </div>
      </header>

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
