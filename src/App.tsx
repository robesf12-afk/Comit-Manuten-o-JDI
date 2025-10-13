// ...imports (se houver)

export default function App() {
  // seu array de links continua igual…

  return (
    <>
      {/* APP BAR */}
      <header className="appbar">
        <div className="appbar-side">
          <img src="/logo-femsa.png" alt="FEMSA" className="logo-femsa" />
        </div>

        <h1 className="appbar-title">
          Comitê de Manutenção • JDI
        </h1>

        <div className="appbar-side">
          {/* use a menor versão redonda (180/192) do comitê */}
          <img src="/logo-comite-180.png" alt="Comitê" className="logo-comite" />
        </div>
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

 

   
       
