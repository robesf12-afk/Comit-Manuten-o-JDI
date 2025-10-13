export default function App() {
  // ajuste os links/descrições aqui
  const links: { t: string; d: string; href: string }[] = [
    { t: "DDM’s", d: "Documentos do DDM", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%20?csf=1&web=1" },
    { t: "Fechamentos (OKR)", d: "Pasta de Fechamentos", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS" },
    { t: "Informativos", d: "Comunicados e materiais", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS" },
    { t: "One Pager", d: "Materiais de uma página", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/ONE%20PAGER" },
    { t: "Papéis & Responsabilidades", d: "Definições de responsabilidades", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/PAPEIS%20RESPONSABILIDADES" },
    { t: "Treinamentos", d: "Materiais e trilhas", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/TREINAMENTOS" },
    // Checklists (Forms)
    { t: "Checklist Pós-Partida", d: "CIP/SETUP/PCM/Grandes Manutenções", href: "https://forms.office.com/Pages/DesignPageV2.aspx?origin=NeoPortalPage..." },
    { t: "Registro de Abertura de PCM", d: "Abertura de PCM e Prestação de Contas", href: "https://forms.office.com/Pages/DesignPageV2.aspx?origin=NeoPortalPage..." }
  ];

  return (
    <div className="container">
     <header className="topbar">
  <div className="brand">
    <img
      src="/logo-comite.png"   // use o seu arquivo do comitê (PNG com fundo transparente)
      alt="Comitê"
      className="logo-inline"
    />
    <h1>Comitê de Manutenção • JDI</h1>
  </div>

  <img
    src="/logo-femsa.png"      // seu logo FEMSA
    alt="FEMSA"
    className="logo-femsa"
  />
</header>


      <main className="grid">
        {links.map((l) => (
          <article key={l.t} className="card">
            <div className="title">{l.t}</div>
            <div className="desc">{l.d}</div>
            <div className="actions">
              <a className="btn" href={l.href} target="_blank" rel="noopener noreferrer">Abrir</a>
            </div>
          </article>
        ))}
      </main>

      <footer>© 2025 Comitê de Manutenção — FEMSA</footer>
    </div>
  );
}

 

   
       
