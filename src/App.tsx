// ...imports (se houver)

export default function App() {
  // seu array de links continua igual…

  return (
   export default function App() {
  type LinkItem = { t: string; d: string; href: string };
  const links: LinkItem[] = [
    { t: "DDM’s", d: "Documentos do DDM", href: "..." },
    { t: "Fechamentos (OKR)", d: "Pasta de Fechamentos", href: "..." },
    { t: "Informativos", d: "Comunicados e materiais", href: "..." },
    { t: "One Pager", d: "Materiais de uma página", href: "..." },
    { t: "Papéis & Responsabilidades", d: "Definições de responsabilidades", href: "..." },
    { t: "Treinamentos", d: "Materiais e trilhas", href: "..." },
    // ...demais links
  ];

  return (
    <>
      {/* ===== APP BAR ===== */}
      <header className="appbar">
        <div className="appbar-side">
          <img src="/logo-femsa.png" alt="FEMSA" className="logo-femsa" />
        </div>

        <h1 className="appbar-title">Comitê de Manutenção • JDI</h1>

        <div className="appbar-side">
          <img src="/logo-comite-180.png" alt="Comitê" className="logo-comite" />
        </div>
      </header>

      {/* ===== CONTEÚDO ===== */}
      <main className="grid">
        {links.map((l) => (
          <article key={l.t} className="card">
            <h2 className="card-title">{l.t}</h2>
            <p className="card-sub">{l.d}</p>
            <a className="btn" href={l.href} target="_blank" rel="noreferrer">
              Abrir
            </a>
          </article>
        ))}
      </main>
    </>
  );
}

      </header>

      {/* o restante do seu layout permanece */}
      <main className="container">
        {/* …suas cards/links… */}
      </main>

      {/* …footer se tiver… */}
    </>
  );
}

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

 

   
       
