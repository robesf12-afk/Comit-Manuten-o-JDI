// src/App.tsx

export default function App() {
  // <<<<< TROQUE os href pelos seus links reais >>>>>
  const links = [
    { t: "DDM’s", d: "Documentos do DDM", href: "#" },
    { t: "Fechamentos (OKR)", d: "Pasta de Fechamentos", href: "#" },
    { t: "Informativos", d: "Comunicados e materiais", href: "#" },
    { t: "One Pager", d: "Materiais de uma página", href: "#" },
    { t: "Papéis & Responsabilidades", d: "Definições de responsabilidades", href: "#" },
    { t: "Treinamentos", d: "Materiais e trilhas", href: "#" },
    // Se tiver mais itens, adicione aqui...
  ];

  return (
    <>
      {/* ===== APP BAR ===== */}
      <header
        className="appbar"
        style={{
          display: "grid",
          gridTemplateColumns: "56px 1fr 56px",
          alignItems: "center",
          gap: 12,
          padding: "12px 16px",
          background: "#d71920", // vermelho FEMSA
          color: "#fff",
          position: "sticky",


   
       
