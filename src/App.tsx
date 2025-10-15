// src/App.tsx

type LinkItem = { t: string; d: string; href: string };

export default function App() {
  const links: LinkItem[] = [
    {
      t: "DDM’s",
      d: "Diálogos de Manutenção",
      href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S?csf=1&web=1&e=PLIm1q",
    },
    {
      t: "FECHAMENTOS (OKR DE MANUTENÇÃO)",
      d: "Pasta de Fechamentos",
      href:
        "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=8h6wvS",
    },
    {
      t: "INFORMATIVOS",
      d: "Informativos sobre as rotinas de manutenção",
      href:
        "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS?csf=1&web=1&e=asEOiD",
    },
    {
      t: "ONE PAGER",
      d: "Resumo dos principais indicadores de manutenção",
      href:
        "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/ONE%20PAGER?csf=1&web=1&e=l95Zsy",
    },
    {
      t: "PAPÉIS & RESPONSABILIDADES",
      d: "Papéis e resoponsabilidades conforme MOM",
      href:
        "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/PAP%C3%89IS%20E%20RESPONSABILIDADES?csf=1&web=1&e=hsdeV2",
    },
    {
      t: "TREINAMENTOS",
      d: "Treinamentos diversos sobre as rotinas de manutenção",
      href:
        "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/TREINAMENTOS?csf=1&web=1&e=oDC8zN",
    }, // <- ESTA VÍRGULA É IMPORTANTE
    {
      t: "RECONHECIMENTOS",
      d: "Áreas reconhecidas por atingimento de meta",
      href:
        "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=JJ88Y3",
    },
  ];

  const openExternal = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    try {
      const w = window.open(url, "_blank");
      // Se o navegador bloqueou popup ou estamos em PWA, faz fallback
      if (!w || w.closed) {
        e.preventDefault();
        window.location.href = url;
      }
    } catch {
      // Qualquer erro: garante a navegação
      e.preventDefault();
      window.location.href = url;
    }
  };

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        background: "#fff",
        color: "#111",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          background: "#d71920",
          color: "#fff",
          padding: "20px 16px",
          textAlign: "center",
          fontWeight: 700,
          fontSize: 20,
        }}
      >
        Comitê de Manutenção • JDI
      </header>

      <main style={{ maxWidth: 980, margin: "0 auto", padding: "16px" }}>
        <h2 style={{ margin: "16px 0", fontSize: 18, fontWeight: 700 }}>Acesso rápido</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {links.map((l) => (
            <article
              key={l.t}
              style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 1px 3px rgba(0,0,0,.08)",
                border: "1px solid #eee",
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontWeight: 700 }}>{l.t}</div>
              <div style={{ color: "#555", fontSize: 14 }}>{l.d}</div>

              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                onClick={(e) => openExternal(e, l.href)}
                style={{
                  alignSelf: "flex-start",
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
        </div>

        <p style={{ color: "#777", fontSize: 12, marginTop: 24 }}>
          © 2025 Comitê de Manutenção — FEMSA
        </p>
      </main>
    </div>
  );
}
