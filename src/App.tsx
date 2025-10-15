/* App.tsx – versão completa com fallback nos links externos e tema claro */

type LinkItem = { t: string; d: string; href: string };

/* ===================================================================
   LINKS – COLE AQUI OS SEUS LINKS ATUAIS
   -------------------------------------------------------------------
   Substitua o conteúdo do array abaixo pelos seus links reais.
   Exemplo de item:
   { t: "DDM’s", d: "Diálogos de Manutenção", href: "https://meu-link..." }
   =================================================================== */
export default function App() {
  const links = [
    { t: "DDM’s", d: "Diálogos de Manutenção", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S?csf=1&web=1&e=PLIm1q" },
    { t: "FECHAMENTOS (OKR DE MANUTENÇÃO)", d: "Pasta de Fechamentos", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=8h6wvS" },
    { t: "INFORMATIVOS", d: "Informativos sobre as rotinas de manutenção", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS?csf=1&web=1&e=asEOiD" },
    { t: "ONE PAGER", d: "Resumo dos principais indicadores de manutenção", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/ONE%20PAGER?csf=1&web=1&e=l95Zsy" },
    { t: "PAPÉIS & RESPONSABILIDADES", d: "Papéis e resoponsabilidades conforme MOM", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/PAP%C3%89IS%20E%20RESPONSABILIDADES?csf=1&web=1&e=hsdeV2" },
    { t: "TREINAMENTOS", d: "Treinamentos diversos sobre as rotinas de manutenção", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/TREINAMENTOS?csf=1&web=1&e=oDC8zN"
    { t: "RECONHECIMENTOS", d: "Áreas reconhecidas por atingimento de meta", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=JJ88Y3"},
  ];
/* ------------------------------------------------------------------ */
/* Cores e medidas do cabeçalho                                       */
const BAR_H = 56;      // altura do topo
const LOGO_L_W = 90;   // largura logo FEMSA (esquerda)
const LOGO_R_W = 30;   // largura logo Comitê (direita)

/* ------------------------------------------------------------------ */
/* CSS inline (estilo claro, cards e botões)                          */
const css = `
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body {
    margin: 0;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    background: #fafafa;
    color: #111;
  }

  header.header {
    height: ${BAR_H}px;
    display: grid;
    grid-template-columns: ${LOGO_L_W}px 1fr ${LOGO_R_W}px;
    align-items: center;
    padding: 0 12px;
    background: #e10600; /* Coca FEMSA vermelho */
    color: #fff;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .header-title {
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    line-height: 1.1;
  }

  main.page {
    max-width: 1120px;
    margin: 12px auto 56px;
    padding: 0 12px;
  }

  h2.section {
    margin: 16px 0 8px;
    font-size: 22px;
  }

  p.muted {
    margin: 0 0 18px;
    color: #666;
    font-size: 14px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 14px;
  }

  @media (min-width: 640px) {
    .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (min-width: 960px) {
    .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  .card {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 1px 2px rgba(0,0,0,.04);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .card h3 {
    margin: 0;
    font-size: 18px;
  }

  .card p {
    margin: 0;
    color: #555;
    font-size: 14px;
    min-height: 36px;
  }

  .btn {
    display: inline-block;
    align-self: flex-start;
    background: #d71920;
    color: #fff;
    text-decoration: none;
    padding: 10px 16px;
    border-radius: 10px;
    font-weight: 700;
    transition: filter .15s ease;
  }
  .btn:active { filter: brightness(.95); }
`;

export default function App() {
  return (
    <>
      <style>{css}</style>

      {/* TOPO */}
      <header className="header">
        {/* Logo FEMSA – esquerda */}
        <img
          src="/logo-femsa.png"
          alt="FEMSA"
          style={{ height: BAR_H - 18, width: "auto", objectFit: "contain" }}
        />

        {/* Título central */}
        <div className="header-title">
          Comitê de Manutenção • JDI
        </div>

        {/* Logo Comitê – direita */}
        <img
          src="/logo-comite.png"
          alt="Comitê"
          style={{ height: BAR_H - 18, width: "auto", objectFit: "contain", justifySelf: "end" }}
        />
      </header>

      {/* CONTEÚDO */}
      <main className="page">
        <h2 className="section">Acesso rápido</h2>
        <p className="muted">Atalhos para pastas do SharePoint e formulários do Forms.</p>

        <section className="grid">
          {links.map((l, i) => (
            <article key={i} className="card">
              <h3>{l.t}</h3>
              <p>{l.d}</p>

              {/* Botão com fallback:
                 - tenta abrir em nova aba/janela;
                 - se o navegador bloquear (ou estiver como PWA), abre na mesma aba. */}
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                onClick={(e) => {
                  try {
                    const w = window.open(l.href, "_blank");
                    if (!w || w.closed) {
                      e.preventDefault();
                      window.location.href = l.href;
                    }
                  } catch {
                    e.preventDefault();
                    window.location.href = l.href;
                  }
                }}
              >
                Abrir
              </a>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
