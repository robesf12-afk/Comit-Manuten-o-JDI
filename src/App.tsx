type LinkItem = {
  label: string;
  href: string;
  desc?: string;
  color?: string;
  emoji?: string;
};

const LINKS: LinkItem[] = [
  // ====== SHAREPOINT ======
  {
    label: "DDM’s",
    href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S?csf=1&web=1&e=KAMPhw",
    desc: "Pasta com DDM’s e registros de manutenção",
    color: "#ffe5e5",
    emoji: "🧩",
  },
  {
    label: "Fechamentos • OKR de Manutenção",
    href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=ufhe0U",
    desc: "Relatórios e resultados mensais de OKR",
    color: "#ffcccc",
    emoji: "📊",
  },
  {
    label: "Informativos",
    href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS?csf=1&web=1&e=je6ag0",
    desc: "Comunicados e informativos da manutenção",
    color: "#fddede",
    emoji: "📢",
  },
  {
    label: "One Pager",
    href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/ONE%20PAGER?csf=1&web=1&e=8wmcwI",
    desc: "Resumo OKR e materiais de acompanhamento",
    color: "#ffeaea",
    emoji: "🗂️",
  },
  {
    label: "Papéis e Responsabilidades",
    href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/PAP%C3%89IS%20E%20RESPONSABILIDADES?csf=1&web=1&e=sFPbdV",
    desc: "Funções e responsabilidades da equipe",
    color: "#fff1f1",
    emoji: "👥",
  },
  {
    label: "Treinamentos",
    href: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/TREINAMENTOS?csf=1&web=1&e=XxZGMO",
    desc: "Cronograma e materiais de capacitação",
    color: "#ffe5e5",
    emoji: "🎓",
  },

  // ====== FORMS ======
  {
    label: "DDM’s (Forms) – Prefill",
    href: "https://forms.office.com/Pages/DesignPageV2.aspx?origin=NeoPortalPage&subpage=design&id=QtWUcBU4gkyx1WkX0EQ89IvsP_YVPjJJhA-rzC2o4A5UNFNCSkE3RjZON1M3NlFQWTgyTkc0MUFSWC4u&topview=Prefill",
    desc: "Formulário DDM’s – com prefill automático",
    color: "#fff7ed",
    emoji: "✅",
  },
  {
    label: "Checklist (Forms) – Prefill",
    href: "https://forms.office.com/Pages/DesignPageV2.aspx?origin=NeoPortalPage&subpage=design&id=QtWUcBU4gkyx1WkX0EQ89IvsP_YVPjJJhA-rzC2o4A5UNlJNM01FRTFFQ0NVUUVKMjdYRVdWUDNUUC4u&topview=Prefill",
    desc: "Checklist de manutenção diária",
    color: "#fff5f5",
    emoji: "📝",
  },
];

function Card({ item }: { item: LinkItem }) {
  const style: React.CSSProperties = {
    textDecoration: "none",
    color: "#222",
    border: "1px solid #e5e7eb",
    borderRadius: 20,
    padding: 20,
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    background: item.color || "white",
    display: "block",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  const hoverStyle: React.CSSProperties = {
    transform: "scale(1.03)",
    boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
  };

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      style={style}
      onMouseOver={(e) =>
        Object.assign((e.currentTarget as HTMLElement).style, hoverStyle)
      }
      onMouseOut={(e) =>
        Object.assign((e.currentTarget as HTMLElement).style, {
          transform: "scale(1)",
          boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
        })
      }
    >
      <div style={{ fontSize: 30, lineHeight: 1 }}>{item.emoji || "🔗"}</div>
      <h3 style={{ margin: "8px 0 6px", color: "#990000" }}>{item.label}</h3>
      {item.desc && (
        <p style={{ margin: 0, color: "#4b5563", fontSize: 14 }}>{item.desc}</p>
      )}
    </a>
  );
}

export default function App() {
  return (
    <div
      style={{
        fontFamily: "system-ui, Arial",
        padding: 24,
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <h1 style={{ color: "#990000" }}>Comitê de Manutenção • JDI</h1>
      <p style={{ marginTop: 8, color: "#444", fontSize: 16 }}>
        Portal FEMSA | Acesso rápido às pastas da manutenção e formulários de
        acompanhamento.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20,
          marginTop: 24,
        }}
      >
        {LINKS.map((item) => (
          <Card key={item.label} item={item} />
        ))}
      </div>

      <footer
        style={{
          marginTop: 40,


