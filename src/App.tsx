type LinkItem = {
  label: string;
  href: string;
  desc?: string;
  color?: string;
  emoji?: string;
  disabled?: boolean;
};

const LINKS: LinkItem[] = [
  // ====== SHAREPOINT (cole os links quando tiver) ======
  {
    label: "DDM’s (SharePoint)",
    href: "PASTE_SHAREPOINT_DDMS_HERE",
    desc: "Pasta com DDM’s",
    color: "#fef3c7",
    emoji: "🧩",
    disabled: true, // altere para false quando colar o link
  },
  {
    label: "Fechamentos",
    href: "PASTE_SHAREPOINT_FECHAMENTOS_HERE",
    desc: "Relatórios de fechamento",
    color: "#dcfce7",
    emoji: "📊",
    disabled: true,
  },
  {
    label: "Informativos",
    href: "PASTE_SHAREPOINT_INFORMATIVOS_HERE",
    desc: "Comunicados e informativos",
    color: "#e0e7ff",
    emoji: "📢",
    disabled: true,
  },
  {
    label: "One Pager",
    href: "PASTE_SHAREPOINT_ONEPAGER_HERE",
    desc: "Resumo OKR / materiais",
    color: "#fee2e2",
    emoji: "🗂️",
    disabled: true,
  },
  {
    label: "Papéis e Responsabilidades",
    href: "PASTE_SHAREPOINT_PAPEIS_HERE",
    desc: "R&R da manutenção",
    color: "#f5f5f5",
    emoji: "👥",
    disabled: true,
  },

  // ====== FORMS (funcionando) ======
  {
    label: "DDM’s (Forms) – Prefill",
    href:
      "https://forms.office.com/Pages/DesignPageV2.aspx?origin=NeoPortalPage&subpage=design&id=QtWUcBU4gkyx1WkX0EQ89IvsP_YVPjJJhA-rzC2o4A5UNFNCSkE3RjZON1M3NlFQWTgyTkc0MUFSWC4u&topview=Prefill",
    desc: "Formulário DDM’s – com prefill",
    color: "#fff7ed",
    emoji: "✅",
  },
  {
    label: "Checklist (Forms) – Prefill",
    href:
      "https://forms.office.com/Pages/DesignPageV2.aspx?origin=NeoPortalPage&subpage=design&id=QtWUcBU4gkyx1WkX0EQ89IvsP_YVPjJJhA-rzC2o4A5UNlJNM01FRTFFQ0NVUUVKMjdYRVdWUDNUUC4u&topview=Prefill",
    desc: "Checklist de Manutenção – com prefill",
    color: "#ecfeff",
    emoji: "📝",
  },
];

function Card({ item }: { item: LinkItem }) {
  const style: React.CSSProperties = {
    textDecoration: "none",
    color: "inherit",
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    background: item.color || "white",
    cursor: item.disabled ? "not-allowed" : "pointer",
    opacity: item.disabled ? 0.6 : 1,
    display: "block",
  };

  const inner = (
    <>
      <div style={{ fontSize: 28, lineHeight: 1 }}>{item.emoji || "🔗"}</div>
      <h3 style={{ margin: "8px 0 6px" }}>{item.label}</h3>
      {item.desc && (
        <p style={{ margin: 0, color: "#4b5563" }}>{item.desc}</p>
      )}
      {item.disabled && (
        <p style={{ marginTop: 8, fontSize: 12, color: "#9ca3af" }}>
          Cole o link do SharePoint aqui e remova <b>disabled: true</b>.
        </p>
      )}
    </>
  );

  return item.disabled ? (
    <div style={style} aria-disabled="true">
      {inner}
    </div>
  ) : (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"

function Card({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link to={to} style={{
      textDecoration: "none",
      color: "inherit",
      border: "1px solid #e5e7eb",
      borderRadius: 16,
      padding: 16,
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
    }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ marginBottom: 0, color: "#4b5563" }}>{desc}</p>
    </Link>
  );
}
