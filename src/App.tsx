export default function App() {
  const links = [
    { t: "DDM’s", d: "Documentos do DDM", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S?csf=1&web=1&e=KAMPhw" },
    { t: "Fechamentos (OKR)", d: "Pasta de Fechamentos", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=ufhe0U" },
    { t: "Informativos", d: "Comunicados e materiais", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS?csf=1&web=1&e=je6ag0" },
    { t: "One Pager", d: "Materiais de uma página", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/ONE%20PAGER?csf=1&web=1&e=8wmcwI" },
    { t: "Papéis & Responsabilidades", d: "Definições de responsabilidades", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/PAP%C3%89IS%20E%20RESPONSABILIDADES?csf=1&web=1&e=sFPbdV" },
    { t: "Treinamentos", d: "Materiais e trilhas", href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/TREINAMENTOS?csf=1&web=1&e=XxZGMO" },
    { t: "Checklist DDM’s (Forms)", d: "Abrir formulário com prefill", href: "https://forms.office.com/Pages/DesignPageV2.aspx?origin=NeoPortalPage&subpage=design&id=QtWUcBU4gkyx1WkX0EQ89IvsP_YVPjJJhA-rzC2o4A5UNFNCSkE3RjZON1M3NlFQWTgyTkc0MUFSWC4u&topview=Prefill" },
    { t: "Checklist (Forms)", d: "Abrir formulário com prefill", href: "https://forms.office.com/Pages/DesignPageV2.aspx?origin=NeoPortalPage&subpage=design&id=QtWUcBU4gkyx1WkX0EQ89IvsP_YVPjJJhA-rzC2o4A5UNlJNM01FRTFFQ0NVUUVKMjdYRVdWUDNUUC4u&topview=Prefill" },
  ];

  return (
    <>
      <header className="header">
        <img src="/logo-femsa.png" alt="FEMSA" />
        <div className="title">Comitê de Manutenção • JDI</div>
        <div className="spacer" />
        <img src="/logo-comite.png" alt="Comitê de Manutenção" />
      </header>

      <main className="container">
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ margin: "0 0 12px" }}>Acesso rápido</h2>
          <p style={{ margin: 0, color: "#6b6b6b" }}>
            Atalhos para pastas do SharePoint e checklists do Forms.
          </p>
        </section>

        <div className="grid">
          {links.map((l) => (
            <Card key={l.t} title={l.t} desc={l.d} href={l.href} />
          ))}
        </div>

        <div className="footer">© {new Date().getFullYear()} Comitê de Manutenção — FEMSA</div>
      </main>
    </>
  );
}

function Card({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>{desc}</p>
      <a className="btn" href={href} target="_blank" rel="noopener noreferrer">
        Abrir
      </a>
    </article>
  );
}

