// src/App.tsx
import React, { useEffect, useState, useRef } from "react";
import { readDiagnostics, activatePush } from "./push";

import {
  IconOKR,
  IconDDM,
  IconOnePager,
  IconTreinamentos,
  IconPapeis,
  IconChecklist,
  IconRegistroPCM,
  IconReconhecimentos,
} from "./icons";

/* Ícones locais extras */
const IconHelp: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M9.7 9.5a2.8 2.8 0 0 1 5.1 1.6c0 2-2.6 2.3-2.6 3.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="18" r="1.25" fill="currentColor" />
  </svg>
);
const IconDoc: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="2" />
    <path d="M14 3v5h5" stroke="currentColor" strokeWidth="2" />
    <path d="M9.5 12h5M9.5 15.5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IconCost: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="8" cy="14" r="4.5" stroke="currentColor" strokeWidth="2" />
    <line x1="6.2" y1="13.2" x2="9.8" y2="13.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="6.2" y1="15.6" x2="9.8" y2="15.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="2" />
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="17" y1="2.6" x2="17" y2="1.6" />
      <line x1="17" y1="12.4" x2="17" y2="13.4" />
      <line x1="12.6" y1="7" x2="11.6" y2="7" />
      <line x1="21.4" y1="7" x2="22.4" y2="7" />
      <line x1="13.9" y1="3.9" x2="13.2" y2="3.2" />
      <line x1="20.8" y1="10.8" x2="21.5" y2="11.5" />
      <line x1="20.8" y1="3.2" x2="21.5" y2="2.5" />
      <line x1="13.9" y1="10.1" x2="13.2" y2="10.8" />
    </g>
  </svg>
);

/* Links */
const LINKS = {
  okr: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=e0QIRb",
  ddm: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/DDM%C2%B4S?csf=1&web=1&e=kXfLLD",
  onepager: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/ONE%20PAGER?csf=1&web=1&e=mTBbo1",
  treinamentos: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/TREINAMENTOS?csf=1&web=1&e=RYgJ70",
  papeis: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/PAP%C3%89IS%20E%20RESPONSABILIDADES?csf=1&web=1&e=C529Nu",
  informativos: "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS?csf=1&web=1&e=dy3e4Y",
  checklist: "https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink",
  registro: "https://forms.office.com/r/mt0JTBJiK6?origin=lprLink",
  reconhecimentos: "https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink",
  programacao:
    "https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PROGRAMA%C3%87%C3%83O%20PRE%20PCM?csf=1&web=1&e=abSPHT",
  painel:
    "https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PAINEL%20DISTRIBUI%C3%87%C3%83O%20DE%20HORAS?csf=1&web=1&e=VWusRL",
  duvidas:
    "https://forms.office.com/Pages/ResponsePage.aspx?id=QtWUcBU4gkyx1WkX0EQ89IvsP_YVPjJJhA-rzC2o4A5UQ0RMMlM0MVZKWFdVN01IMzlUSjBMWVZBSS4u",
  custo:
    "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/CUSTO%20DE%20MANUTEN%C3%87%C3%83O?csf=1&web=1&e=S0gfpV",

  /* Novos */
  backlog:
    "https://cocacolafemsa.sharepoint.com/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/Forms/AllItems.aspx?id=%2Fsites%2FPROGRAMAOPREPCMJUNDIAIOSASCO%2FDocumentos%20Compartilhados%2FBACKLOG%20PLANOS%5FCORRETIVAS&viewid=308aff45%2D8d06%2D4097%2D93e5%2Dabd3af4e0bf4",
  controleAprov:
    "https://cocacolafemsa.sharepoint.com/:f:/r/sites/Aprovaodematerial/Documentos%20Compartilhados/Bases%20-%20Semana%2045?csf=1&web=1&e=1BIDKL",
} as const;

/* Menu */
const MENU = [
  { id: "registro", title: "Registro de reuniões Abertura de PCM e Prestação de Contas", url: LINKS.registro, Icon: IconRegistroPCM },
  { id: "checklist", title: "Registro Check List Pós Partida de PCM", url: LINKS.checklist, Icon: IconChecklist },
  { id: "programacao", title: "Programação de PCM", url: LINKS.programacao, Icon: IconChecklist },
  { id: "painel", title: "Painel de Distribuição de Horas", url: LINKS.painel, Icon: IconOKR },

  /* Novo item abaixo do Painel */
  { id: "backlog", title: "BACKLOG – Consulte aqui o backlog da sua linha/área", url: LINKS.backlog, Icon: IconChecklist },

  { id: "ddms", title: "DDM's", url: LINKS.ddm, Icon: IconDDM },
  { id: "okr", title: "OKR de Manutenção (Fechamentos)", url: LINKS.okr, Icon: IconOKR },
  { id: "custo", title: "Custo de Manutenção", url: LINKS.custo, Icon: IconCost },

  /* Novo item abaixo de Custo de Manutenção */
  { id: "controle-aprov", title: "Controle de aprovação de ordens", url: LINKS.controleAprov, Icon: IconDoc },

  { id: "onepager", title: "One Pager", url: LINKS.onepager, Icon: IconOnePager },
  { id: "treinamentos", title: "Treinamentos", url: LINKS.treinamentos, Icon: IconTreinamentos },
  { id: "papeis", title: "Papéis e Responsabilidades", url: LINKS.papeis, Icon: IconPapeis },
  { id: "reconhecimentos", title: "Reconhecimentos", url: LINKS.reconhecimentos, Icon: IconReconhecimentos },
  { id: "informativos", title: "Informativos", url: LINKS.informativos, Icon: IconDoc },
  { id: "duvidas", title: "Dúvidas e Sugestões sobre os processos de Manutenção", url: LINKS.duvidas, Icon: IconHelp },
];

/* banners estáticos */
const STATIC_FROM_FOLDER = [
  { img: "/banners_media/ASSERTIVIDADE.png" },
  { img: "/banners_media/quebra diaria.PNG" },
  { img: "/banners_media/quebra por linha.PNG" },
  { img: "/banners_media/ÁREAS.jpeg" },
];

/* ===== CTA de Notificações com diagnóstico ===== */
const NotifyCTA: React.FC = () => {
  const [show, setShow] = useState(false);
  const [perm, setPerm] = useState<NotificationPermission | "loading">("loading");
  const [enabled, setEnabled] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [subId, setSubId] = useState<string | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const [debugOpen, setDebugOpen] = useState(false);

  const DISMISS_KEY = "pushCTA:dismissed";

  const computeShouldShow = (opts: {
    enabled: boolean;
    perm: NotificationPermission | "loading";
    isSupported: boolean;
    subId?: string | null;
  }) => {
    const dismissed = localStorage.getItem(DISMISS_KEY) === "1";
    if (dismissed) return false;
    if (!opts.isSupported) return false;
    if (opts.enabled) return false;
    if (opts.perm === "granted") return false;
    if (opts.subId) return false;

    const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isStandalone =
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      // @ts-ignore
      window.navigator?.standalone === true;

    return isiOS ? isStandalone : true;
  };

  const refreshDiag = async () => {
    try {
      const d = await readDiagnostics();
      setPerm(d.permission as NotificationPermission);
      setEnabled(!!d.enabled);
      setIsSupported(!!d.isSupported);
      setSubId(d.subscriptionId ?? null);
      setLastError(d.lastError ?? null);

      const should = computeShouldShow({
        enabled: !!d.enabled,
        perm: d.permission as NotificationPermission,
        isSupported: !!d.isSupported,
        subId: d.subscriptionId ?? null,
      });
      setShow(should);
    } catch {
      setIsSupported(true);
      setShow(true);
    }
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      await refreshDiag();

      (window as any).OneSignalDeferred = (window as any).OneSignalDeferred || [];
      (window as any).OneSignalDeferred.push((OneSignal: any) => {
        OneSignal.on?.("subscriptionChange", async (sub: boolean) => {
          if (!mounted) return;
          setEnabled(sub);
          if (sub) {
            localStorage.setItem(DISMISS_KEY, "1");
            setShow(false);
          }
          await refreshDiag();
        });
        OneSignal.on?.("notificationPermissionChange", async () => {
          if (!mounted) return;
          await refreshDiag();
        });
      });

      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") refreshDiag();
      });

      try {
        const u = new URL(window.location.href);
        if (u.searchParams.get("debugPush") === "1") setDebugOpen(true);
      } catch {}
    };

    init();
    return () => {
      mounted = false;
    };
  }, []);

  const onActivate = async () => {
    const d = await activatePush();
    setPerm(d.permission as NotificationPermission);
    setEnabled(!!d.enabled);
    setIsSupported(!!d.isSupported);
    setSubId(d.subscriptionId ?? null);
    setLastError(d.lastError ?? null);

    if (d.enabled || d.permission === "granted" || d.subscriptionId) {
      localStorage.setItem(DISMISS_KEY, "1");
      setShow(false);
    } else {
      const should = computeShouldShow({
        enabled: !!d.enabled,
        perm: d.permission as NotificationPermission,
        isSupported: !!d.isSupported,
        subId: d.subscriptionId ?? null,
      });
      setShow(should);
    }
  };

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setShow(false);
  };

  if (!show) {
    return (
      <>
        {debugOpen && (
          <div style={{ margin: "8px 12px", padding: "8px 12px", border: "1px dashed #bbb", borderRadius: 8, fontSize: 12, background: "#fafafa" }}>
            <b>Debug Push</b> | permissão: <code>{perm}</code> | inscrito: <code>{String(enabled)}</code> | suportado: <code>{String(isSupported)}</code>
            {subId ? <> | subId: <code>{subId}</code></> : null}
            {lastError ? <> | erro: <code>{lastError}</code></> : null}
            <button style={{ marginLeft: 8 }} onClick={onActivate}>Forçar Prompt</button>
          </div>
        )}
      </>
    );
  }

  const denied = perm === "denied";
  return (
    <>
      <div className="notify-cta" role="region" aria-label="Ativar notificações">
        <span className="notify-title">🔔 Notificações</span>
        {!isSupported ? (
          <span className="notify-text">Este navegador não suporta notificações push.</span>
        ) : denied ? (
          <span className="notify-text">
            Notificações estão <b>bloqueadas</b>. Clique no cadeado da barra de endereço → Permissões → <b>Notificações: Permitir</b>.
          </span>
        ) : (
          <span className="notify-text">Toque para permitir avisos do Comitê.</span>
        )}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button className="notify-btn" onClick={onActivate}>{denied ? "Como liberar" : "Ativar"}</button>
          <button className="notify-btn" style={{ background: "#777" }} onClick={dismiss} aria-label="Não mostrar de novo">Não mostrar</button>
        </div>
      </div>

      {debugOpen && (
        <div style={{ margin: "8px 12px", padding: "8px 12px", border: "1px dashed #bbb", borderRadius: 8, fontSize: 12, background: "#fafafa" }}>
          <b>Debug Push</b> | permissão: <code>{perm}</code> | inscrito: <code>{String(enabled)}</code> | suportado: <code>{String(isSupported)}</code>
          {subId ? <> | subId: <code>{subId}</code></> : null}
          {lastError ? <> | erro: <code>{lastError}</code></> : null}
          <button style={{ marginLeft: 8 }} onClick={onActivate}>Forçar Prompt</button>
        </div>
      )}
    </>
  );
};

export default function App() {
  const [open, setOpen] = useState(false);
  const [onePagers, setOnePagers] = useState<string[]>([]);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [bannerErro, setBannerErro] = useState<string | null>(null);

  const [isNarrow, setIsNarrow] = useState(true);
  const [showIosBanner, setShowIosBanner] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Aviso iPhone só quando NÃO estiver instalado
  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = window.navigator.userAgent;
      const isiOS = /iPhone|iPad|iPod/i.test(ua);
      let isStandalone = false;
      try {
        isStandalone =
          (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
          (window.navigator && (window.navigator as any).standalone === true);
      } catch {}
      setShowIosBanner(isiOS && !isStandalone);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const check = () => setIsNarrow(window.innerWidth <= 650);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ===== Carregar e ORDENAR: fábrica (0) → G1 (1) → G2 (2) → G3 (3) =====
  useEffect(() => {
    fetch("/banners_media/onepagers.json")
      .then((res) => {
        if (!res.ok) throw new Error("não achei onepagers.json");
        return res.json();
      })
      .then((data: string[]) => {
        const normalize = (s: string) =>
          s
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")     // tira acentos
            .replace(/[_-]+/g, " ")              // underscores/hífens viram espaço
            .replace(/\s*\.\s*/g, ".")           // remove espaços antes/depois do ponto
            .replace(/\s+/g, " ")                // colapsa espaços
            .trim();

        const rank = (name: string) => {
          const n = normalize(name).replace(/\.png$/i, "");
          if (/\bfabrica\b/.test(n)) return 0;
          if (/\bg1\b/.test(n)) return 1;
          if (/\bg2\b/.test(n)) return 2;
          if (/\bg3\b/.test(n)) return 3;
          return 1000; // outros vão para o fim
        };

        const ordered = [...data].sort((a, b) => {
          const ra = rank(a);
          const rb = rank(b);
          if (ra !== rb) return ra - rb;
          return a.localeCompare(b, undefined, { sensitivity: "base" });
        });

        setOnePagers(ordered);
        setBannerIndex(0);
      })
      .catch(() => setBannerErro("Não foi possível carregar o carrossel."));
  }, []);

  // sem automático
  useEffect(() => {
    if (onePagers.length > 0) setBannerIndex(0);
  }, [onePagers]);

  const nextSlide = () => {
    if (onePagers.length > 0) setBannerIndex((p) => (p + 1) % onePagers.length);
  };
  const prevSlide = () => {
    if (onePagers.length > 0) setBannerIndex((p) => (p - 1 + onePagers.length) % onePagers.length);
  };

  // Swipe no mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const min = 40;
    if (onePagers.length > 0) {
      if (diff > min) nextSlide();
      else if (diff < -min) prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // ⌨️ Atalhos de teclado (desktop)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (window.innerWidth < 701) return;
      if (open) return;
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (["input", "textarea", "select"].includes(tag)) return;
      if (window.getSelection && String(window.getSelection()).length > 0) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onePagers]);

  const currentOnePager = onePagers.length ? `/banners_media/${onePagers[bannerIndex]}` : null;
  const mobilePaddingTop = isNarrow ? 33 : 28;

  return (
    <div className="app">
      <style>{`
        .topbar{ position: sticky; top: 0; z-index: 100; background:#cc0000; box-shadow:0 6px 18px rgba(0,0,0,.15); }
        .topbar-inner{ max-width:1200px; margin:0 auto; padding:6px 6px; display:grid; gap:6px; align-items:center; grid-template-columns:auto 58px 1fr 92px; position:relative; }
        .menu-btn{ width:44px;height:44px;border:none;border-radius:999px; background:#b80000;color:#fff; display:grid;place-items:center; box-shadow:0 4px 12px rgba(0,0,0,.25); cursor:pointer; }
        .menu-btn .bar{width:22px;height:2px;background:#fff;margin:2.5px 0;border-radius:2px;}
        .logo-comite{height:46px;}
        .logo-femsa{height:44px;justify-self:end;}
        .title-chip{ color:#fff;font-weight:900;text-align:center; background:rgba(255,255,255,.12); padding:8px 12px;border-radius:999px; white-space:nowrap;overflow:hidden;text-overflow:ellipsis; font-size:clamp(16px, 2.7vw, 28px); }
        @media (max-width:600px){
          .topbar-inner{ grid-template-columns:40px 1fr auto; grid-template-areas:"logo title femsa"; padding:6px 8px 18px; }
          .ga-logo{ grid-area:logo; height:32px; }
          .ga-title{ grid-area:title; }
          .ga-femsa{ grid-area:femsa; height:28px; }
          .menu-btn{ position:absolute; left:8px; bottom:-26px; width:40px;height:40px; border-radius:12px; background:#cc0000; box-shadow:0 6px 14px rgba(0,0,0,.22), 0 0 0 2px rgba(255,255,255,.85); z-index:101; }
        }
        .notify-cta{ position:sticky; top:0; z-index:1100; background:#fff7f7; border:1px solid #ffd6d6; border-radius:12px; padding:10px 12px; margin:8px 12px; box-shadow:0 6px 18px rgba(0,0,0,.08); display:flex; align-items:center; gap:10px; }
        .notify-title{ color:#b30000; font-weight:800; }
        .notify-text{ font-size:13px; color:#333; }
        .notify-btn{ background:#cc0000; color:#fff; border:none; border-radius:999px; padding:8px 12px; font-weight:800; cursor:pointer; box-shadow:0 4px 12px rgba(179,0,0,.25); }
        .banners-container{ display:flex; flex-direction:column; gap:18px; padding:14px 12px 28px; align-items:center; }
        .banner-dinamico{ width:100%; max-width:980px; border-radius:16px; box-shadow:0 4px 12px rgba(0,0,0,.12); background:#000; overflow:hidden; position:relative; }
        .banner-dinamico img{ width:100%; height:auto; display:block; touch-action:auto; user-select:none; }
        .banner-dots{ display:flex; gap:6px; justify-content:center; }
        .banner-dot{ width:9px;height:9px;border-radius:999px;background:#ddd;border:none; cursor:pointer; }
        .banner-dot.active{ background:#cc0000;width:28px; }
        .static-banner{ width:100%; max-width:980px; border-radius:14px; box-shadow:0 4px 10px rgba(0,0,0,.08); display:block; }
        .ios-hint{ background:#fff7d9; border:1px solid rgba(204,0,0,.35); color:#492100; margin:0 auto; max-width:1200px; padding:10px 14px; display:flex; gap:10px; align-items:flex-start; font-size:14px; }
        .ios-hint strong{ display:block; font-size:14px; }
        .ios-hint button{ background:transparent; border:none; font-size:16px; cursor:pointer; margin-left:auto; }
        .drawer-overlay{ position:fixed;inset:0;background:rgba(0,0,0,.35); transition:opacity .2s ease;z-index:100; }
        .drawer{ position:fixed;top:0;left:0;height:100dvh;width:320px;max-width:86vw; background:#fff;box-shadow:4px 0 24px rgba(0,0,0,.18); z-index:102;display:flex;flex-direction:column; transition:transform .22s ease-out; }
        .drawer-header{ display:flex;align-items:center;justify-content:space-between; padding:14px 14px 10px 16px;border-bottom:1px solid #eee; }
        .drawer-link{ display:grid;grid-template-columns:26px 1fr;gap:12px; align-items:center;padding:12px 10px;border-radius:10px; color:#222;text-decoration:none; }
        .drawer-ico{color:#cc0000;display:grid;place-items:center;}
        .banner-arrow{ position:absolute; top:50%; transform:translateY(-50%); width:42px;height:42px; border:none;border-radius:999px; background:rgba(0,0,0,.35); color:#fff; display:grid; place-items:center; cursor:pointer; box-shadow:0 4px 10px rgba(0,0,0,.25); transition:background .15s ease, transform .15s ease; user-select:none; }
        .banner-arrow:hover{ background:rgba(0,0,0,.5); transform:translateY(-50%) scale(1.04); }
        .banner-arrow:active{ transform:translateY(-50%) scale(0.98); }
        .banner-arrow.left{ left:10px; }
        .banner-arrow.right{ right:10px; }
        .banner-arrow svg{ width:20px;height:20px; }
        @media (max-width: 700px){ .banner-arrow{ display:none; } }
      `}</style>

      {/* Topbar */}
      <header className="topbar">
        <div className="topbar-inner">
          <button className="menu-btn" aria-label="Abrir menu" onClick={() => setOpen(true)}>
            <span className="bar" /><span className="bar" /><span className="bar" />
          </button>
          <img className="logo-comite ga-logo" src="/logo-comite.png" alt="Comitê de Manutenção JDI" />
          <div className="title-chip ga-title">COMITÊ DE MANUTENÇÃO • JDI</div>
          <img className="logo-femsa ga-femsa" src="/logo-femsa.png" alt="Coca-Cola FEMSA" />
        </div>
      </header>

      {/* CTA Notificações */}
      <NotifyCTA />

      {/* Aviso iPhone */}
      {showIosBanner && (
        <div className="ios-hint">
          <div>
            <strong>iPhone detectado 📱</strong>
            Para instalar: no Safari → **compartilhar** → **Adicionar à Tela de Início**.
          </div>
          <button onClick={() => setShowIosBanner(false)} aria-label="Fechar aviso">×</button>
        </div>
      )}

      {/* Drawer */}
      <div className="drawer-overlay" style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }} onClick={() => setOpen(false)} />
      <aside className="drawer" style={{ transform: open ? "translateX(0)" : "translateX(-102%)" }} role="dialog" aria-modal="true">
        <div className="drawer-header">
          <strong style={{ fontSize: 18 }}>Categorias</strong>
          <button onClick={() => setOpen(false)} style={{ background: "transparent", border: "none", fontSize: 22, cursor: "pointer" }} aria-label="Fechar menu">×</button>
        </div>
        <nav style={{ padding: "8px 6px 16px 6px", overflow: "auto" }}>
          {MENU.map(({ id, title, url, Icon }) => (
            <a key={id} href={url} target="_blank" rel="noopener noreferrer" className="drawer-link" onClick={() => setOpen(false)}>
              <span className="drawer-ico"><Icon /></span>
              <span>{title}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="banners-container" style={{ paddingTop: mobilePaddingTop }}>
        {bannerErro ? (
          <div style={{ width: "100%", maxWidth: 980, background: "#fee", color: "#900", padding: 12, borderRadius: 12 }}>
            {bannerErro}
          </div>
        ) : !currentOnePager ? (
          <div style={{ width: "100%", maxWidth: 980, background: "#eee", color: "#777", padding: 12, borderRadius: 12 }}>
            Carregando One Pagers...
          </div>
        ) : (
          <>
            <div
              className="banner-dinamico"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {onePagers.length > 1 && !isNarrow && (
                <>
                  <button className="banner-arrow left" onClick={prevSlide} aria-label="Anterior">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button className="banner-arrow right" onClick={nextSlide} aria-label="Próximo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}

              <img src={currentOnePager} alt={onePagers[bannerIndex]} />
            </div>
            {onePagers.length > 1 && (
              <div className="banner-dots">
                {onePagers.map((_, i) => (
                  <button
                    key={i}
                    className={`banner-dot ${i === bannerIndex ? "active" : ""}`}
                    onClick={() => setBannerIndex(i)}
                    aria-label={`Ver banner ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {STATIC_FROM_FOLDER.map((b, i) => (
          <img key={i} src={b.img} alt={`banner-${i}`} className="static-banner" />
        ))}
      </main>
    </div>
  );
}
