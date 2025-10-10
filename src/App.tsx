import { Link } from "react-router-dom";

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui, Arial", padding: 24, maxWidth: 900 }}>
      <h1>Comitê de Manutenção • JDI</h1>
      <p>Escolha uma área:</p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16
      }}>
        <Card to="/ddm" title="DDM (Diálogo de Manutenção)" desc="Registro e acompanhamento" />
        <Card to="/treinamentos" title="Treinamentos" desc="Cronograma, presença e materiais" />
        <Card to="/onepager" title="One-Pager OKR" desc="Resumo de objetivos e metas" />
      </div>
    </div>
  );
}

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
