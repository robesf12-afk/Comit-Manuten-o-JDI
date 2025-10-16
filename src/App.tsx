:root{
  --brand:#d70000; --ink:#111827; --muted:#6b7280; --bg:#fafafa; --card:#ffffff; --ring:rgba(215,0,0,.2);

  /* Tamanhos fluídos para topo */
  --logo-size: clamp(64px, 8vw, 80px);
  --title-font: clamp(18px, 2.2vw + 6px, 28px);
  --title-pad-y: clamp(8px, 1.2vw, 12px);
  --title-pad-x: clamp(14px, 2vw, 22px);
}
*{box-sizing:border-box}
html,body,#root{height:100%}
body{margin:0; font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Arial,sans-serif; color:var(--ink); background:var(--bg)}

.topbar{
  position:sticky; top:0; z-index:10;
  display:flex; align-items:center; gap:16px;
  padding:12px 20px 16px 12px;
  background:var(--card); border-bottom:1px solid #e5e7eb;
}

/* Esquerda: logo do comitê + tarja vermelha (AGORA EN-COS-TA-DO) */
.brand{display:flex; align-items:center; gap:0}
.brand-mark{height:var(--logo-size); width:auto; border-radius:50%}

/* Tarja – estilo “Abrir”, responsiva, SEMPRE MAIÚSCULO */
.brand-title{
  margin:0;
  background:var(--brand);
  color:#fff;
  font-weight:800;
  font-size:var(--title-font);
  padding:var(--title-pad-y) var(--title-pad-x);
  border-radius:12px;
  line-height:1.05;
  display:inline-flex;
  align-items:center;
  white-space:normal;
  text-transform: uppercase !important;  /* força maiúsculo */
}

/* Direita: apenas FEMSA */
.logos{margin-left:auto; display:flex; align-items:center; gap:12px}
.logos img{height:34px; width:auto}

/* Conteúdo */
.container{max-width:1100px; margin:24px auto; padding:0 16px}
.grid{display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:20px}

.card{
  display:grid; grid-template-columns:56px 1fr auto; align-items:center; gap:12px;
  padding:16px; border-radius:16px; background:var(--card); border:1px solid #e5e7eb;
  text-decoration:none; color:inherit; box-shadow:0 1px 2px rgba(0,0,0,.04);
  transition:transform .08s, box-shadow .08s, border-color .08s;
}
.card:hover{transform:translateY(-2px); box-shadow:0 6px 16px rgba(0,0,0,.08); border-color:var(--ring)}
.card-icon{font-size:28px}

/* Títulos dos cards em MAIÚSCULO */
.card-body h2{ font-size:16px; margin:0 0 4px; text-transform:uppercase; }
.card-body p { margin:0; color:var(--muted); font-size:13px; }

/* Botão “Abrir” */
.card-cta{
  font-weight:700; background:var(--brand); color:#fff;
  padding:10px 16px; border-radius:12px; text-transform:none; letter-spacing:.2px;
}

/* ===== Celular ===== */
@media (max-width: 480px){
  :root{
    --logo-size: clamp(68px, 16vw, 76px);
    --title-font: clamp(17px, 4.5vw, 20px);
    --title-pad-y: 10px;
    --title-pad-x: 16px;
  }
  .brand{ gap:0 }            /* encostado também no mobile */
  .container{ padding:0 14px }

  .card{
    grid-template-columns:52px 1fr auto;
    padding:18px;
  }
  .card-icon{ font-size:30px }
  .card-body h2{ font-size:18px }
  .card-body p { font-size:14px }
  .card-cta   { padding:12px 18px }
}

.footer{padding:24px; text-align:center; color:var(--muted)}
.btn{padding:8px 12px; border-radius:12px; border:1px solid #e5e7eb; background:#fff; cursor:pointer}

