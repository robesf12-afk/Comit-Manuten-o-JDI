// src/App.tsx
import React, { useEffect, useRef, useState } from "react";
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
  IconEscola,
} from "./icons";

/* =========================================================
   ÍCONES LOCAIS
========================================================= */

const IconHelp: React.FC = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="2"
    />

    <path
      d="M9.7 9.5a2.8 2.8 0 0 1 5.1 1.6c0 2-2.6 2.3-2.6 3.9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    <circle
      cx="12"
      cy="18"
      r="1.25"
      fill="currentColor"
    />
  </svg>
);

const IconDoc: React.FC = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
      stroke="currentColor"
      strokeWidth="2"
    />

    <path
      d="M14 3v5h5"
      stroke="currentColor"
      strokeWidth="2"
    />

    <path
      d="M9.5 12h5M9.5 15.5h5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const IconCost: React.FC = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="8"
      cy="14"
      r="4.5"
      stroke="currentColor"
      strokeWidth="2"
    />

    <line
      x1="6.2"
      y1="13.2"
      x2="9.8"
      y2="13.2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    <line
      x1="6.2"
      y1="15.6"
      x2="9.8"
      y2="15.6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    <circle
      cx="17"
      cy="7"
      r="2"
      stroke="currentColor"
      strokeWidth="2"
    />

    <g
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
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

/* =========================================================
   LINKS
========================================================= */

const LINKS = {
  okr:
    "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/FECHAMENTOS?csf=1&web=1&e=e0QIRb",

  ddm:
    "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com/Documents/DDM%C2%B4S?csf=1&web=1&e=bi46ug",

  onepager:
    "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/ONE%20PAGER?csf=1&web=1&e=mTBbo1",

  treinamentos:
    "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com/Documents/TREINAMENTOS?csf=1&web=1&e=saAQe5",

  papeis:
    "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com/Documents/PAP%C3%89IS%20E%20RESPONSABILIDADES?csf=1&web=1&e=96jRRw",

  informativos:
    "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/INFORMATIVOS?csf=1&web=1&e=dy3e4Y",

  checklist:
    "https://forms.office.com/r/XM1hQ5YCrp?origin=lprLink",

  registro:
    "https://forms.office.com/Pages/ResponsePage.aspx?id=QtWUcBU4gkyx1WkX0EQ89IvsP_YVPjJJhA-rzC2o4A5UMFE4RVhON1daSklPQ0s2QVIxMTk1RDFGTS4u",

  reconhecimentos:
    "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com_mx/Documents/RECONHECIMENTOS?csf=1&web=1&e=ujB2BW",

  programacao:
    "https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PROGRAMA%C3%87%C3%83O%20PRE%20PCM?csf=1&web=1&e=abSPHT",

  painel:
    "https://cocacolafemsa.sharepoint.com/:f:/r/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/PAINEL%20DISTRIBUI%C3%87%C3%83O%20DE%20HORAS?csf=1&web=1&e=VWusRL",

  duvidas:
    "https://forms.office.com/Pages/ResponsePage.aspx?id=QtWUcBU4gkyx1WkX0EQ89IvsP_YVPjJJhA-rzC2o4A5UQ0RMMlM0MVZKWFdVN01IMzlUSjBMWVZBSS4u",

  custo:
    "https://cocacolafemsa-my.sharepoint.com/:f:/r/personal/roberta_dossantos_kof_com/Documents/CUSTO%20DE%20MANUTEN%C3%87%C3%83O?csf=1&web=1&e=hb8HSo",

  backlog:
    "https://cocacolafemsa.sharepoint.com/sites/PROGRAMAOPREPCMJUNDIAIOSASCO/Documentos%20Compartilhados/Forms/AllItems.aspx?id=%2Fsites%2FPROGRAMAOPREPCMJUNDIAIOSASCO%2FDocumentos%20Compartilhados%2FBACKLOG%20PLANOS%5FCORRETIVAS&viewid=308aff45%2D8d06%2D4097%2D93e5%2Dabd3af4e0bf4",

  controleAprov:
    "https://cocacolafemsa.sharepoint.com/:f:/r/sites/Aprovaodematerial/Documentos%20Compartilhados/Bases%20-%20Semana%2045?csf=1&web=1&e=1BIDKL",

  escolaDiagnostico:
    "https://forms.office.com/Pages/ResponsePage.aspx?id=QtWUcBU4gkyx1WkX0EQ89NQvr1f1E89KpsqePqDJsJ9UNzlGS0JOWkVPQjdGUEE4NTRMN1YxUDhaNC4u&origin=Invitation&channel=0",
} as const;

/* =========================================================
   MENU
========================================================= */

const MENU = [
  {
    id: "registro",
    title:
      "Registro de reuniões Abertura de PCM e Prestação de Contas",
    url: LINKS.registro,
    Icon: IconRegistroPCM,
  },
  {
    id: "checklist",
    title: "Registro Check List Pós Partida de PCM",
    url: LINKS.checklist,
    Icon: IconChecklist,
  },
  {
    id: "programacao",
    title: "Programação de PCM",
    url: LINKS.programacao,
    Icon: IconChecklist,
  },
  {
    id: "painel",
    title: "Painel de Distribuição de Horas",
    url: LINKS.painel,
    Icon: IconOKR,
  },
  {
    id: "backlog",
    title: "BACKLOG – Consulte aqui o backlog da sua linha/área",
    url: LINKS.backlog,
    Icon: IconChecklist,
  },
  {
    id: "ddms",
    title: "DDM's",
    url: LINKS.ddm,
    Icon: IconDDM,
  },
  {
    id: "okr",
    title: "OKR de Manutenção (Fechamentos)",
    url: LINKS.okr,
    Icon: IconOKR,
  },
  {
    id: "custo",
    title: "Custo de Manutenção",
    url: LINKS.custo,
    Icon: IconCost,
  },
  {
    id: "controle-aprov",
    title: "Controle de aprovação de ordens",
    url: LINKS.controleAprov,
    Icon: IconDoc,
  },
  {
    id: "onepager",
    title: "One Pager",
    url: LINKS.onepager,
    Icon: IconOnePager,
  },
  {
    id: "treinamentos",
    title: "Treinamentos",
    url: LINKS.treinamentos,
    Icon: IconTreinamentos,
  },
  {
    id: "escola-tecnica",
    title:
      "Escola Técnica KOF - Diagnóstico Necessidade de Treinamento",
    url: LINKS.escolaDiagnostico,
    Icon: IconEscola,
  },
  {
    id: "papeis",
    title: "Papéis e Responsabilidades",
    url: LINKS.papeis,
    Icon: IconPapeis,
  },
  {
    id: "reconhecimentos",
    title: "Reconhecimentos",
    url: LINKS.reconhecimentos,
    Icon: IconReconhecimentos,
  },
  {
    id: "informativos",
    title: "Informativos",
    url: LINKS.informativos,
    Icon: IconDoc,
  },
  {
    id: "duvidas",
    title: "Dúvidas e Sugestões sobre os processos de Manutenção",
    url: LINKS.duvidas,
    Icon: IconHelp,
  },
];

/* =========================================================
   BANNERS ESTÁTICOS

   O banner estático antigo de OKR foi retirado daqui,
   porque o OKR agora será exibido no novo carrossel.
========================================================= */

const STATIC_FROM_FOLDER: {
  img: string;
  title?: string;
}[] = [
  {
    img: "/banners_media/ASSERTIVIDADE.png",
    title: "ASSERTIVIDADE",
  },
  {
    img: "/banners_media/ÁREAS.jpeg",
    title: "RECONHECIMENTO",
  },
];

/* =========================================================
   FUNÇÕES DE IMAGEM
========================================================= */

const loadedImages = new Set<string>();

function preloadImage(url: string | null) {
  if (!url || loadedImages.has(url)) return;

  const img = new Image();

  img.src = url;

  img.onload = () => {
    loadedImages.add(url);
  };
}

function buildUrl(file?: string, version?: number) {
  if (!file) return null;

  return `/banners_media/${file}?v=${version ?? ""}`;
}

function normalizeName(value: string) {
  return value
    .normalize("NFC")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
   SMART IMAGE
========================================================= */

type SmartImgProps = {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  loading?: "eager" | "lazy";
  decoding?: "auto" | "sync" | "async";
  fetchPriority?: "high" | "low" | "auto";
  onErrorHide?: boolean;
};

const SmartImg: React.FC<SmartImgProps> = ({
  src,
  alt,
  className,
  onLoad,
  loading,
  decoding,
  fetchPriority,
  onErrorHide,
}) => {
  const [current, setCurrent] = useState(src);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setCurrent(src);
    setIndex(0);
  }, [src]);

  const createVariants = (url: string) => {
    const [base, query = ""] = url.split("?");
    const queryString = query ? `?${query}` : "";

    const dotPosition = base.lastIndexOf(".");

    if (dotPosition < 0) {
      return [url];
    }

    const fileName = base.substring(0, dotPosition);
    const extension = base.substring(dotPosition + 1);
    const extensionLower = extension.toLowerCase();

    const variants = new Set<string>();

    variants.add(`${fileName}.${extension}${queryString}`);

    if (extensionLower === "png") {
      variants.add(`${fileName}.PNG${queryString}`);
      variants.add(`${fileName}.png${queryString}`);
    } else if (extensionLower === "jpg") {
      variants.add(`${fileName}.JPG${queryString}`);
      variants.add(`${fileName}.jpg${queryString}`);
      variants.add(`${fileName}.jpeg${queryString}`);
      variants.add(`${fileName}.JPEG${queryString}`);
    } else if (extensionLower === "jpeg") {
      variants.add(`${fileName}.JPEG${queryString}`);
      variants.add(`${fileName}.jpeg${queryString}`);
      variants.add(`${fileName}.jpg${queryString}`);
      variants.add(`${fileName}.JPG${queryString}`);
    } else {
      variants.add(
        `${fileName}.${extension.toUpperCase()}${queryString}`
      );

      variants.add(
        `${fileName}.${extension.toLowerCase()}${queryString}`
      );
    }

    return Array.from(variants);
  };

  const variants = createVariants(src);

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      onLoad={() => {
        loadedImages.add(current);
        onLoad?.();
      }}
      onError={(event) => {
        const nextIndex = index + 1;

        if (nextIndex < variants.length) {
          setIndex(nextIndex);
          setCurrent(variants[nextIndex]);
          return;
        }

        if (onErrorHide) {
          event.currentTarget.style.display = "none";
        }
      }}
    />
  );
};

/* =========================================================
   BOTÃO DAS SETAS
========================================================= */

type ArrowButtonProps = {
  side: "left" | "right";
  title: string;
  onClick: () => void;
};

const ArrowButton: React.FC<ArrowButtonProps> = ({
  side,
  title,
  onClick,
}) => {
  const buttonStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [side]: 10,
    width: 42,
    height: 42,
    border: "none",
    borderRadius: 9999,
    background: "rgba(0,0,0,.35)",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,.25)",
    userSelect: "none",
    zIndex: 50,
    pointerEvents: "auto",
    touchAction: "manipulation",
    WebkitTapHighlightColor: "transparent",
  };

  const stopEvent = (
    event: React.SyntheticEvent
  ) => {
    event.stopPropagation();
  };

  return (
    <button
      type="button"
      aria-label={title}
      title={title}
      style={buttonStyle}
      onClick={onClick}
      onTouchStart={stopEvent}
      onPointerDown={stopEvent}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{
          width: 20,
          height: 20,
          pointerEvents: "none",
        }}
      >
        {side === "left" ? (
          <path
            d="M15 18l-6-6 6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M9 6l6 6-6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
};

/* =========================================================
   CTA DE NOTIFICAÇÕES
========================================================= */

const NotifyCTA: React.FC = () => {
  const [show, setShow] = useState(false);

  const [permission, setPermission] = useState<
    NotificationPermission | "loading"
  >("loading");

  const [enabled, setEnabled] = useState(false);
  const [supported, setSupported] = useState(true);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const [debugOpen, setDebugOpen] = useState(false);

  const DISMISS_KEY = "pushCTA:dismissed";

  const shouldShow = (options: {
    enabled: boolean;
    permission: NotificationPermission | "loading";
    supported: boolean;
    subscriptionId?: string | null;
  }) => {
    const dismissed =
      localStorage.getItem(DISMISS_KEY) === "1";

    if (dismissed) return false;
    if (!options.supported) return false;
    if (options.enabled) return false;
    if (options.permission === "granted") return false;
    if (options.subscriptionId) return false;

    const isiOS =
      /iPhone|iPad|iPod/i.test(navigator.userAgent);

    const isStandalone =
      (window.matchMedia &&
        window.matchMedia("(display-mode: standalone)")
          .matches) ||
      (window.navigator as any)?.standalone === true;

    return isiOS ? isStandalone : true;
  };

  const refreshDiagnostics = async () => {
    try {
      const diagnostics = await readDiagnostics();

      setPermission(
        diagnostics.permission as NotificationPermission
      );

      setEnabled(Boolean(diagnostics.enabled));
      setSupported(Boolean(diagnostics.isSupported));

      setSubscriptionId(
        diagnostics.subscriptionId ?? null
      );

      setLastError(
        diagnostics.lastError ?? null
      );

      setShow(
        shouldShow({
          enabled: Boolean(diagnostics.enabled),
          permission:
            diagnostics.permission as NotificationPermission,
          supported: Boolean(diagnostics.isSupported),
          subscriptionId:
            diagnostics.subscriptionId ?? null,
        })
      );
    } catch {
      setSupported(true);
      setShow(true);
    }
  };

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      await refreshDiagnostics();

      (window as any).OneSignalDeferred =
        (window as any).OneSignalDeferred || [];

      (window as any).OneSignalDeferred.push(
        (OneSignal: any) => {
          OneSignal.on?.(
            "subscriptionChange",
            async (subscribed: boolean) => {
              if (!mounted) return;

              setEnabled(subscribed);

              if (subscribed) {
                localStorage.setItem(
                  DISMISS_KEY,
                  "1"
                );

                setShow(false);
              }

              await refreshDiagnostics();
            }
          );

          OneSignal.on?.(
            "notificationPermissionChange",
            async () => {
              if (!mounted) return;

              await refreshDiagnostics();
            }
          );
        }
      );

      document.addEventListener(
        "visibilitychange",
        () => {
          if (
            document.visibilityState === "visible"
          ) {
            refreshDiagnostics();
          }
        }
      );

      try {
        const url = new URL(window.location.href);

        if (
          url.searchParams.get("debugPush") === "1"
        ) {
          setDebugOpen(true);
        }
      } catch {
        // Sem ação
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  const activateNotifications = async () => {
    const diagnostics = await activatePush();

    setPermission(
      diagnostics.permission as NotificationPermission
    );

    setEnabled(Boolean(diagnostics.enabled));
    setSupported(Boolean(diagnostics.isSupported));

    setSubscriptionId(
      diagnostics.subscriptionId ?? null
    );

    setLastError(
      diagnostics.lastError ?? null
    );

    if (
      diagnostics.enabled ||
      diagnostics.permission === "granted" ||
      diagnostics.subscriptionId
    ) {
      localStorage.setItem(DISMISS_KEY, "1");
      setShow(false);
    } else {
      setShow(
        shouldShow({
          enabled: Boolean(diagnostics.enabled),
          permission:
            diagnostics.permission as NotificationPermission,
          supported: Boolean(diagnostics.isSupported),
          subscriptionId:
            diagnostics.subscriptionId ?? null,
        })
      );
    }
  };

  const dismissNotifications = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setShow(false);
  };

  if (!show) {
    return (
      <>
        {debugOpen && (
          <div
            style={{
              margin: "8px 12px",
              padding: "8px 12px",
              border: "1px dashed #bbb",
              borderRadius: 8,
              fontSize: 12,
              background: "#fafafa",
            }}
          >
            <b>Debug Push</b>

            {" | "}

            permissão: <code>{permission}</code>

            {" | "}

            inscrito: <code>{String(enabled)}</code>

            {" | "}

            suportado: <code>{String(supported)}</code>

            {subscriptionId ? (
              <>
                {" | "}
                subId: <code>{subscriptionId}</code>
              </>
            ) : null}

            {lastError ? (
              <>
                {" | "}
                erro: <code>{lastError}</code>
              </>
            ) : null}

            <button
              style={{ marginLeft: 8 }}
              onClick={activateNotifications}
            >
              Forçar Prompt
            </button>
          </div>
        )}
      </>
    );
  }

  const denied = permission === "denied";

  return (
    <>
      <div
        className="notify-cta"
        role="region"
        aria-label="Ativar notificações"
      >
        <span className="notify-title">
          🔔 Notificações
        </span>

        {!supported ? (
          <span className="notify-text">
            Este navegador não suporta notificações push.
          </span>
        ) : denied ? (
          <span className="notify-text">
            Notificações estão <b>bloqueadas</b>.
            Clique no cadeado da barra de endereço →
            Permissões → <b>Notificações: Permitir</b>.
          </span>
        ) : (
          <span className="notify-text">
            Toque para permitir avisos do Comitê.
          </span>
        )}

        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: 8,
          }}
        >
          <button
            className="notify-btn"
            onClick={activateNotifications}
          >
            {denied ? "Como liberar" : "Ativar"}
          </button>

          <button
            className="notify-btn"
            style={{ background: "#777" }}
            onClick={dismissNotifications}
            aria-label="Não mostrar de novo"
          >
            Não mostrar
          </button>
        </div>
      </div>

      <div
        style={{
          margin: "8px 12px",
          padding: "8px 12px",
          border: "1px dashed #bbb",
          borderRadius: 8,
          fontSize: 12,
          background: "#fafafa",
        }}
      >
        <b>Debug Push</b>

        {" | "}

        permissão: <code>{permission}</code>

        {" | "}

        inscrito: <code>{String(enabled)}</code>

        {" | "}

        suportado: <code>{String(supported)}</code>

        {subscriptionId ? (
          <>
            {" | "}
            subId: <code>{subscriptionId}</code>
          </>
        ) : null}

        {lastError ? (
          <>
            {" | "}
            erro: <code>{lastError}</code>
          </>
        ) : null}

        <button
          style={{ marginLeft: 8 }}
          onClick={activateNotifications}
        >
          Forçar Prompt
        </button>
      </div>
    </>
  );
};

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

export default function App() {
  const [open, setOpen] = useState(false);

  /* One Pager */

  const [onePagers, setOnePagers] =
    useState<string[]>([]);

  const [bannerIndex, setBannerIndex] =
    useState(0);

  const [bannerError, setBannerError] =
    useState<string | null>(null);

  /* OKR de Manutenção */

  const [okrImages, setOkrImages] =
    useState<string[]>([]);

  const [okrIndex, setOkrIndex] =
    useState(0);

  /* Quebra Diária */

  const [dailyBreakImages, setDailyBreakImages] =
    useState<string[]>([]);

  const [dailyBreakIndex, setDailyBreakIndex] =
    useState(0);

  /* Quebra por Linha */

  const [lineBreakImages, setLineBreakImages] =
    useState<string[]>([]);

  const [lineBreakIndex, setLineBreakIndex] =
    useState(0);

  /* Layout */

  const [isNarrow, setIsNarrow] =
    useState(true);

  const [showIosBanner, setShowIosBanner] =
    useState(false);

  /* Controle do carregamento das imagens */

  const [readyOnePager, setReadyOnePager] =
    useState(false);

  const [readyOKR, setReadyOKR] =
    useState(false);

  const [readyDailyBreak, setReadyDailyBreak] =
    useState(false);

  const [readyLineBreak, setReadyLineBreak] =
    useState(false);

  /* Versão para impedir cache antigo */

  const [assetVersion, setAssetVersion] =
    useState(Date.now());

  /* Controle do movimento no celular */

  const touchStartX =
    useRef<number | null>(null);

  const touchEndX =
    useRef<number | null>(null);

  /* =======================================================
     AVISO DE INSTALAÇÃO NO IPHONE
  ======================================================= */

  useEffect(() => {
    const userAgent =
      window.navigator.userAgent;

    const isiOS =
      /iPhone|iPad|iPod/i.test(userAgent);

    let isStandalone = false;

    try {
      isStandalone =
        (window.matchMedia &&
          window.matchMedia(
            "(display-mode: standalone)"
          ).matches) ||
        (window.navigator as any)
          .standalone === true;
    } catch {
      isStandalone = false;
    }

    setShowIosBanner(
      isiOS && !isStandalone
    );
  }, []);

  /* =======================================================
     IDENTIFICAR TELA PEQUENA
  ======================================================= */

  useEffect(() => {
    const checkWidth = () => {
      setIsNarrow(
        window.innerWidth <= 650
      );
    };

    checkWidth();

    window.addEventListener(
      "resize",
      checkWidth
    );

    return () => {
      window.removeEventListener(
        "resize",
        checkWidth
      );
    };
  }, []);

  /* =======================================================
     BLOQUEAR ROLAGEM COM MENU ABERTO
  ======================================================= */

  useEffect(() => {
    document.body.style.overflow =
      open ? "hidden" : "";
  }, [open]);

  /* =======================================================
     FECHAR MENU COM ESC
  ======================================================= */

  useEffect(() => {
    const closeWithEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      closeWithEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        closeWithEscape
      );
    };
  }, []);

  /* =======================================================
     CARREGAR ONE PAGERS
  ======================================================= */

  useEffect(() => {
    const loadOnePagers = async () => {
      try {
        const response = await fetch(
          `/banners_media/onepagers.json?v=${Date.now()}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error();
        }

        const data: string[] =
          await response.json();

        const fileMap =
          new Map<string, string>();

        for (const fileName of data) {
          fileMap.set(
            normalizeName(fileName),
            fileName
          );
        }

        const order = [
          "one pager fabrica.PNG",
          "one pager G1.PNG",
          "one pager G2.PNG",
          "one pager G3.PNG",
        ];

        const ordered: string[] = [];

        for (const expectedName of order) {
          const found = fileMap.get(
            normalizeName(expectedName)
          );

          if (found) {
            ordered.push(found);
          }
        }

        const extras = data.filter(
          (fileName) =>
            !ordered.includes(fileName)
        );

        const finalImages = [
          ...ordered,
          ...extras,
        ];

        setOnePagers(finalImages);
        setBannerIndex(0);
        setBannerError(null);

        preloadImage(
          buildUrl(
            finalImages[0],
            assetVersion
          )
        );

        preloadImage(
          buildUrl(
            finalImages[1],
            assetVersion
          )
        );

        preloadImage(
          buildUrl(
            finalImages[
              finalImages.length - 1
            ],
            assetVersion
          )
        );

        setAssetVersion(Date.now());
      } catch {
        setBannerError(
          "Não foi possível carregar o carrossel."
        );
      }
    };

    loadOnePagers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =======================================================
     CARREGAR OKR DE MANUTENÇÃO

     ORDEM:
     JULHO, JUNHO, MAIO, ABRIL, MARÇO,
     FEVEREIRO E JANEIRO DE 2026.
  ======================================================= */

  useEffect(() => {
    const loadOKR = async () => {
      try {
        const response = await fetch(
          `/banners_media/okr_manutencao.json?v=${Date.now()}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error();
        }

        const data: string[] =
          await response.json();

        const fileMap =
          new Map<string, string>();

        for (const fileName of data) {
          fileMap.set(
            normalizeName(fileName),
            fileName
          );
        }

        const order = [
          "OKR DE MANUTENÇÃO JULHO DE 2026.png",
          "OKR DE MANUTENÇÃO JUNHO DE 2026.png",
          "OKR DE MANUTENÇÃO MAIO DE 2026.png",
          "OKR DE MANUTENÇÃO ABRIL DE 2026.png",
          "OKR DE MANUTENÇÃO MARÇO DE 2026.png",
          "OKR DE MANUTENÇÃO FEVEREIRO DE 2026.png",
          "OKR DE MANUTENÇÃO JANEIRO 2026.png",
        ];

        const ordered: string[] = [];

        for (const expectedName of order) {
          const found = fileMap.get(
            normalizeName(expectedName)
          );

          if (found) {
            ordered.push(found);
          }
        }

        const extras = data.filter(
          (fileName) =>
            !ordered.includes(fileName)
        );

        const finalImages = [
          ...ordered,
          ...extras,
        ];

        setOkrImages(finalImages);
        setOkrIndex(0);

        preloadImage(
          buildUrl(
            finalImages[0],
            assetVersion
          )
        );

        preloadImage(
          buildUrl(
            finalImages[1],
            assetVersion
          )
        );

        setAssetVersion(Date.now());
      } catch {
        setOkrImages([]);
      }
    };

    loadOKR();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =======================================================
     CARREGAR QUEBRA DIÁRIA
  ======================================================= */

  useEffect(() => {
    const loadDailyBreak = async () => {
      try {
        const response = await fetch(
          `/banners_media/quebra_diaria.json?v=${Date.now()}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error();
        }

        const data: string[] =
          await response.json();

        const fileMap =
          new Map<string, string>();

        for (const fileName of data) {
          fileMap.set(
            normalizeName(fileName),
            fileName
          );
        }

        const order = [
          "quebra diaria - atual.png",
          "quebra diaria - mês anterior.PNG",
        ];

        const ordered: string[] = [];

        for (const expectedName of order) {
          const found = fileMap.get(
            normalizeName(expectedName)
          );

          if (found) {
            ordered.push(found);
          }
        }

        const extras = data.filter(
          (fileName) =>
            !ordered.includes(fileName)
        );

        const finalImages = [
          ...ordered,
          ...extras,
        ];

        setDailyBreakImages(finalImages);
        setDailyBreakIndex(0);

        preloadImage(
          buildUrl(
            finalImages[0],
            assetVersion
          )
        );

        preloadImage(
          buildUrl(
            finalImages[1],
            assetVersion
          )
        );

        setAssetVersion(Date.now());
      } catch {
        setDailyBreakImages([]);
      }
    };

    loadDailyBreak();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =======================================================
     CARREGAR QUEBRA POR LINHA
  ======================================================= */

  useEffect(() => {
    const loadLineBreak = async () => {
      try {
        const response = await fetch(
          `/banners_media/quebra_por_linha.json?v=${Date.now()}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error();
        }

        const data: string[] =
          await response.json();

        const fileMap =
          new Map<string, string>();

        for (const fileName of data) {
          fileMap.set(
            normalizeName(fileName),
            fileName
          );
        }

        const order = [
          "quebra por linha - atual.PNG",
          "quebra por linha - mês anterior.PNG",
        ];

        const ordered: string[] = [];

        for (const expectedName of order) {
          const found = fileMap.get(
            normalizeName(expectedName)
          );

          if (found) {
            ordered.push(found);
          }
        }

        const extras = data.filter(
          (fileName) =>
            !ordered.includes(fileName)
        );

        const finalImages = [
          ...ordered,
          ...extras,
        ];

        setLineBreakImages(finalImages);
        setLineBreakIndex(0);

        preloadImage(
          buildUrl(
            finalImages[0],
            assetVersion
          )
        );

        preloadImage(
          buildUrl(
            finalImages[1],
            assetVersion
          )
        );

        setAssetVersion(Date.now());
      } catch {
        setLineBreakImages([]);
      }
    };

    loadLineBreak();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =======================================================
     PRELOAD ONE PAGER
  ======================================================= */

  useEffect(() => {
    if (!onePagers.length) return;

    preloadImage(
      buildUrl(
        onePagers[bannerIndex],
        assetVersion
      )
    );

    preloadImage(
      buildUrl(
        onePagers[
          (bannerIndex + 1) %
            onePagers.length
        ],
        assetVersion
      )
    );

    preloadImage(
      buildUrl(
        onePagers[
          (bannerIndex -
            1 +
            onePagers.length) %
            onePagers.length
        ],
        assetVersion
      )
    );

    const current = buildUrl(
      onePagers[bannerIndex],
      assetVersion
    )!;

    setReadyOnePager(
      loadedImages.has(current)
    );
  }, [
    bannerIndex,
    onePagers,
    assetVersion,
  ]);

  /* =======================================================
     PRELOAD OKR
  ======================================================= */

  useEffect(() => {
    if (!okrImages.length) return;

    preloadImage(
      buildUrl(
        okrImages[okrIndex],
        assetVersion
      )
    );

    preloadImage(
      buildUrl(
        okrImages[
          (okrIndex + 1) %
            okrImages.length
        ],
        assetVersion
      )
    );

    preloadImage(
      buildUrl(
        okrImages[
          (okrIndex -
            1 +
            okrImages.length) %
            okrImages.length
        ],
        assetVersion
      )
    );

    const current = buildUrl(
      okrImages[okrIndex],
      assetVersion
    )!;

    setReadyOKR(
      loadedImages.has(current)
    );
  }, [
    okrIndex,
    okrImages,
    assetVersion,
  ]);

  /* =======================================================
     PRELOAD QUEBRA DIÁRIA
  ======================================================= */

  useEffect(() => {
    if (!dailyBreakImages.length) return;

    preloadImage(
      buildUrl(
        dailyBreakImages[dailyBreakIndex],
        assetVersion
      )
    );

    preloadImage(
      buildUrl(
        dailyBreakImages[
          (dailyBreakIndex + 1) %
            dailyBreakImages.length
        ],
        assetVersion
      )
    );

    preloadImage(
      buildUrl(
        dailyBreakImages[
          (dailyBreakIndex -
            1 +
            dailyBreakImages.length) %
            dailyBreakImages.length
        ],
        assetVersion
      )
    );

    const current = buildUrl(
      dailyBreakImages[dailyBreakIndex],
      assetVersion
    )!;

    setReadyDailyBreak(
      loadedImages.has(current)
    );
  }, [
    dailyBreakIndex,
    dailyBreakImages,
    assetVersion,
  ]);

  /* =======================================================
     PRELOAD QUEBRA POR LINHA
  ======================================================= */

  useEffect(() => {
    if (!lineBreakImages.length) return;

    preloadImage(
      buildUrl(
        lineBreakImages[lineBreakIndex],
        assetVersion
      )
    );

    preloadImage(
      buildUrl(
        lineBreakImages[
          (lineBreakIndex + 1) %
            lineBreakImages.length
        ],
        assetVersion
      )
    );

    preloadImage(
      buildUrl(
        lineBreakImages[
          (lineBreakIndex -
            1 +
            lineBreakImages.length) %
            lineBreakImages.length
        ],
        assetVersion
      )
    );

    const current = buildUrl(
      lineBreakImages[lineBreakIndex],
      assetVersion
    )!;

    setReadyLineBreak(
      loadedImages.has(current)
    );
  }, [
    lineBreakIndex,
    lineBreakImages,
    assetVersion,
  ]);

  /* =======================================================
     NAVEGAÇÃO ONE PAGER
  ======================================================= */

  const nextOnePager = () => {
    if (!onePagers.length) return;

    setBannerIndex(
      (previous) =>
        (previous + 1) %
        onePagers.length
    );
  };

  const previousOnePager = () => {
    if (!onePagers.length) return;

    setBannerIndex(
      (previous) =>
        (previous -
          1 +
          onePagers.length) %
        onePagers.length
    );
  };

  /* =======================================================
     MOVIMENTO DO DEDO NO CELULAR
  ======================================================= */

  const handleTouchStart = (
    event: React.TouchEvent
  ) => {
    touchStartX.current =
      event.touches[0].clientX;

    touchEndX.current =
      event.touches[0].clientX;
  };

  const handleTouchMove = (
    event: React.TouchEvent
  ) => {
    touchEndX.current =
      event.touches[0].clientX;
  };

  type CarouselType =
    | "onepager"
    | "okr"
    | "daily"
    | "line";

  const handleTouchEnd = (
    type: CarouselType
  ) => {
    if (
      touchStartX.current === null ||
      touchEndX.current === null
    ) {
      return;
    }

    const difference =
      touchStartX.current -
      touchEndX.current;

    const minimumDistance = 40;

    if (difference > minimumDistance) {
      if (
        type === "onepager" &&
        onePagers.length
      ) {
        nextOnePager();
      }

      if (
        type === "okr" &&
        okrImages.length
      ) {
        setOkrIndex(
          (previous) =>
            (previous + 1) %
            okrImages.length
        );
      }

      if (
        type === "daily" &&
        dailyBreakImages.length
      ) {
        setDailyBreakIndex(
          (previous) =>
            (previous + 1) %
            dailyBreakImages.length
        );
      }

      if (
        type === "line" &&
        lineBreakImages.length
      ) {
        setLineBreakIndex(
          (previous) =>
            (previous + 1) %
            lineBreakImages.length
        );
      }
    }

    if (difference < -minimumDistance) {
      if (
        type === "onepager" &&
        onePagers.length
      ) {
        previousOnePager();
      }

      if (
        type === "okr" &&
        okrImages.length
      ) {
        setOkrIndex(
          (previous) =>
            (previous -
              1 +
              okrImages.length) %
            okrImages.length
        );
      }

      if (
        type === "daily" &&
        dailyBreakImages.length
      ) {
        setDailyBreakIndex(
          (previous) =>
            (previous -
              1 +
              dailyBreakImages.length) %
            dailyBreakImages.length
        );
      }

      if (
        type === "line" &&
        lineBreakImages.length
      ) {
        setLineBreakIndex(
          (previous) =>
            (previous -
              1 +
              lineBreakImages.length) %
            lineBreakImages.length
        );
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  /* =======================================================
     IMAGENS ATUAIS
  ======================================================= */

  const currentOnePager =
    onePagers.length
      ? buildUrl(
          onePagers[bannerIndex],
          assetVersion
        )
      : null;

  const currentOKR =
    okrImages.length
      ? buildUrl(
          okrImages[okrIndex],
          assetVersion
        )
      : null;

  const currentDailyBreak =
    dailyBreakImages.length
      ? buildUrl(
          dailyBreakImages[
            dailyBreakIndex
          ],
          assetVersion
        )
      : null;

  const currentLineBreak =
    lineBreakImages.length
      ? buildUrl(
          lineBreakImages[
            lineBreakIndex
          ],
          assetVersion
        )
      : null;

  /* =======================================================
     TELA
  ======================================================= */

  return (
    <div className="app">
      <style>{`
        .topbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #cc0000;
          box-shadow: 0 6px 18px rgba(0,0,0,.15);
        }

        .topbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6px;
          display: grid;
          gap: 6px;
          align-items: center;
          grid-template-columns: auto 58px 1fr 92px;
          position: relative;
        }

        .menu-btn {
          width: 44px;
          height: 44px;
          border: none;
          border-radius: 999px;
          background: #b80000;
          color: #fff;
          display: grid;
          place-items: center;
          box-shadow: 0 4px 12px rgba(0,0,0,.25);
          cursor: pointer;
        }

        .menu-btn .bar {
          width: 22px;
          height: 2px;
          background: #fff;
          margin: 2.5px 0;
          border-radius: 2px;
        }

        .logo-comite {
          height: 46px;
        }

        .logo-femsa {
          height: 44px;
          justify-self: end;
        }

        .title-chip {
          color: #fff;
          font-weight: 900;
          text-align: center;
          background: rgba(255,255,255,.12);
          padding: 8px 12px;
          border-radius: 999px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: clamp(16px, 2.7vw, 28px);
        }

        @media (max-width: 600px) {
          .topbar-inner {
            grid-template-columns: 40px 1fr auto;
            grid-template-areas: "logo title femsa";
            padding: 6px 8px 18px;
          }

          .ga-logo {
            grid-area: logo;
            height: 32px;
          }

          .ga-title {
            grid-area: title;
          }

          .ga-femsa {
            grid-area: femsa;
            height: 28px;
          }

          .menu-btn {
            position: absolute;
            left: 8px;
            bottom: -26px;
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: #cc0000;
            box-shadow:
              0 6px 14px rgba(0,0,0,.22),
              0 0 0 2px rgba(255,255,255,.85);
            z-index: 101;
          }
        }

        .notify-cta {
          position: sticky;
          top: 0;
          z-index: 1100;
          background: #fff7f7;
          border: 1px solid #ffd6d6;
          border-radius: 12px;
          padding: 10px 12px;
          margin: 8px 12px;
          box-shadow: 0 6px 18px rgba(0,0,0,.08);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .notify-title {
          color: #b30000;
          font-weight: 800;
        }

        .notify-text {
          font-size: 13px;
          color: #333;
        }

        .notify-btn {
          background: #cc0000;
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 8px 12px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(179,0,0,.25);
        }

        .banners-container {
          display: flex;
          flex-direction: column;
          gap: 18px;
          padding: 14px 12px 28px;
          align-items: center;
        }

        .section-title {
          width: 100%;
          max-width: 980px;
          font-weight: 900;
          font-size: 14px;
          color: #444;
          margin: 6px 0 4px 2px;
        }

        .banner-dinamico {
          width: 100%;
          max-width: 980px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,.12);
          background: #000;
          overflow: hidden;
          position: relative;
          aspect-ratio: 16 / 9;
        }

        .banner-dinamico img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          touch-action: auto;
          user-select: none;
          pointer-events: none;
        }

        .loading-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,.05) 0%,
            rgba(255,255,255,.18) 50%,
            rgba(255,255,255,.05) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.2s infinite linear;
          color: #fff;
          font-weight: 700;
          letter-spacing: .3px;
          pointer-events: none;
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }

          100% {
            background-position: -200% 0;
          }
        }

        .banner-dots {
          display: flex;
          gap: 6px;
          justify-content: center;
        }

        .banner-dot {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: #ddd;
          border: none;
          cursor: pointer;
        }

        .banner-dot.active {
          background: #cc0000;
          width: 28px;
        }

        .static-banner {
          width: 100%;
          max-width: 980px;
          border-radius: 14px;
          box-shadow: 0 4px 10px rgba(0,0,0,.08);
          display: block;
        }

        .ios-hint {
          background: #fff7d9;
          border: 1px solid rgba(204,0,0,.35);
          color: #492100;
          margin: 0 auto;
          max-width: 1200px;
          padding: 10px 14px;
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 14px;
        }

        .ios-hint strong {
          display: block;
          font-size: 14px;
        }

        .ios-hint button {
          background: transparent;
          border: none;
          font-size: 16px;
          cursor: pointer;
          margin-left: auto;
        }

        .drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.35);
          transition: opacity .2s ease;
          z-index: 100;
        }

        .drawer {
          position: fixed;
          top: 0;
          left: 0;
          height: 100dvh;
          width: 320px;
          max-width: 86vw;
          background: #fff;
          box-shadow: 4px 0 24px rgba(0,0,0,.18);
          z-index: 102;
          display: flex;
          flex-direction: column;
          transition: transform .22s ease-out;
        }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 14px 10px 16px;
          border-bottom: 1px solid #eee;
        }

        .drawer-link {
          display: grid;
          grid-template-columns: 26px 1fr;
          gap: 12px;
          align-items: center;
          padding: 12px 10px;
          border-radius: 10px;
          color: #222;
          text-decoration: none;
        }

        .drawer-ico {
          color: #cc0000;
          display: grid;
          place-items: center;
        }
      `}</style>

      {/* TOPO */}

      <header className="topbar">
        <div className="topbar-inner">
          <button
            className="menu-btn"
            aria-label="Abrir menu"
            onClick={() => setOpen(true)}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>

          <img
            className="logo-comite ga-logo"
            src="/logo-comite.png"
            alt="Comitê de Manutenção JDI"
          />

          <div className="title-chip ga-title">
            COMITÊ DE MANUTENÇÃO • JDI
          </div>

          <img
            className="logo-femsa ga-femsa"
            src="/logo-femsa.png"
            alt="Coca-Cola FEMSA"
          />
        </div>
      </header>

      <NotifyCTA />

      {/* AVISO IPHONE */}

      {showIosBanner && (
        <div className="ios-hint">
          <div>
            <strong>
              iPhone detectado 📱
            </strong>

            Para instalar: no Safari → compartilhar →
            Adicionar à Tela de Início.
          </div>

          <button
            onClick={() =>
              setShowIosBanner(false)
            }
            aria-label="Fechar aviso"
          >
            ×
          </button>
        </div>
      )}

      {/* MENU LATERAL */}

      <div
        className="drawer-overlay"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open
            ? "auto"
            : "none",
        }}
        onClick={() => setOpen(false)}
      />

      <aside
        className="drawer"
        style={{
          transform: open
            ? "translateX(0)"
            : "translateX(-102%)",
        }}
        role="dialog"
        aria-modal="true"
      >
        <div className="drawer-header">
          <strong style={{ fontSize: 18 }}>
            Categorias
          </strong>

          <button
            onClick={() => setOpen(false)}
            style={{
              background: "transparent",
              border: "none",
              fontSize: 22,
              cursor: "pointer",
            }}
            aria-label="Fechar menu"
          >
            ×
          </button>
        </div>

        <nav
          style={{
            padding: "8px 6px 16px 6px",
            overflow: "auto",
          }}
        >
          {MENU.map(
            ({
              id,
              title,
              url,
              Icon,
            }) => (
              <a
                key={id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="drawer-link"
                onClick={() =>
                  setOpen(false)
                }
              >
                <span className="drawer-ico">
                  <Icon />
                </span>

                <span>{title}</span>
              </a>
            )
          )}
        </nav>
      </aside>

      {/* CONTEÚDO */}

      <main
        className="banners-container"
        style={{
          paddingTop: isNarrow
            ? 33
            : 28,
        }}
      >
        {/* ONE PAGER */}

        <div className="section-title">
          ONE PAGER
        </div>

        {bannerError ? (
          <div
            style={{
              width: "100%",
              maxWidth: 980,
              background: "#fee",
              color: "#900",
              padding: 12,
              borderRadius: 12,
            }}
          >
            {bannerError}
          </div>
        ) : !currentOnePager ? (
          <div
            style={{
              width: "100%",
              maxWidth: 980,
              background: "#eee",
              color: "#777",
              padding: 12,
              borderRadius: 12,
            }}
          >
            Carregando One Pagers...
          </div>
        ) : (
          <>
            <div
              className="banner-dinamico"
              onTouchStart={
                handleTouchStart
              }
              onTouchMove={
                handleTouchMove
              }
              onTouchEnd={() =>
                handleTouchEnd(
                  "onepager"
                )
              }
            >
              {onePagers.length > 1 && (
                <>
                  <ArrowButton
                    side="left"
                    title="Anterior"
                    onClick={
                      previousOnePager
                    }
                  />

                  <ArrowButton
                    side="right"
                    title="Próximo"
                    onClick={
                      nextOnePager
                    }
                  />
                </>
              )}

              {!readyOnePager && (
                <div className="loading-overlay">
                  Carregando…
                </div>
              )}

              <SmartImg
                src={currentOnePager}
                alt={
                  onePagers[
                    bannerIndex
                  ]
                }
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onLoad={() =>
                  setReadyOnePager(true)
                }
              />
            </div>

            {onePagers.length > 1 && (
              <div className="banner-dots">
                {onePagers.map(
                  (fileName, index) => (
                    <button
                      key={fileName}
                      className={`banner-dot ${
                        index ===
                        bannerIndex
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setBannerIndex(
                          index
                        )
                      }
                      aria-label={`Ver banner ${
                        index + 1
                      }`}
                      type="button"
                    />
                  )
                )}
              </div>
            )}
          </>
        )}

        {/* OKR DE MANUTENÇÃO */}

        <div className="section-title">
          OKR DE MANUTENÇÃO
        </div>

        {!currentOKR ? (
          <div
            style={{
              width: "100%",
              maxWidth: 980,
              background: "#eee",
              color: "#777",
              padding: 12,
              borderRadius: 12,
            }}
          >
            Carregando OKR de Manutenção...
          </div>
        ) : (
          <>
            <div
              className="banner-dinamico"
              onTouchStart={
                handleTouchStart
              }
              onTouchMove={
                handleTouchMove
              }
              onTouchEnd={() =>
                handleTouchEnd("okr")
              }
            >
              {okrImages.length > 1 && (
                <>
                  <ArrowButton
                    side="left"
                    title="Anterior"
                    onClick={() =>
                      setOkrIndex(
                        (previous) =>
                          (previous -
                            1 +
                            okrImages.length) %
                          okrImages.length
                      )
                    }
                  />

                  <ArrowButton
                    side="right"
                    title="Próximo"
                    onClick={() =>
                      setOkrIndex(
                        (previous) =>
                          (previous +
                            1) %
                          okrImages.length
                      )
                    }
                  />
                </>
              )}

              {!readyOKR && (
                <div className="loading-overlay">
                  Carregando…
                </div>
              )}

              <SmartImg
                src={currentOKR}
                alt={
                  okrImages[okrIndex]
                }
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onLoad={() =>
                  setReadyOKR(true)
                }
              />
            </div>

            {okrImages.length > 1 && (
              <div className="banner-dots">
                {okrImages.map(
                  (fileName, index) => (
                    <button
                      key={fileName}
                      className={`banner-dot ${
                        index === okrIndex
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setOkrIndex(index)
                      }
                      aria-label={`Ver OKR ${
                        index + 1
                      }`}
                      title={fileName.replace(
                        /\.(png|jpg|jpeg)$/i,
                        ""
                      )}
                      type="button"
                    />
                  )
                )}
              </div>
            )}
          </>
        )}

        {/* QUEBRA DIÁRIA */}

        <div className="section-title">
          QUEBRA DIÁRIA
        </div>

        {!currentDailyBreak ? (
          <div
            style={{
              width: "100%",
              maxWidth: 980,
              background: "#eee",
              color: "#777",
              padding: 12,
              borderRadius: 12,
            }}
          >
            Carregando Quebra Diária...
          </div>
        ) : (
          <>
            <div
              className="banner-dinamico"
              onTouchStart={
                handleTouchStart
              }
              onTouchMove={
                handleTouchMove
              }
              onTouchEnd={() =>
                handleTouchEnd(
                  "daily"
                )
              }
            >
              {dailyBreakImages.length >
                1 && (
                <>
                  <ArrowButton
                    side="left"
                    title="Anterior"
                    onClick={() =>
                      setDailyBreakIndex(
                        (previous) =>
                          (previous -
                            1 +
                            dailyBreakImages.length) %
                          dailyBreakImages.length
                      )
                    }
                  />

                  <ArrowButton
                    side="right"
                    title="Próximo"
                    onClick={() =>
                      setDailyBreakIndex(
                        (previous) =>
                          (previous +
                            1) %
                          dailyBreakImages.length
                      )
                    }
                  />
                </>
              )}

              {!readyDailyBreak && (
                <div className="loading-overlay">
                  Carregando…
                </div>
              )}

              <SmartImg
                src={currentDailyBreak}
                alt={
                  dailyBreakImages[
                    dailyBreakIndex
                  ]
                }
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onLoad={() =>
                  setReadyDailyBreak(
                    true
                  )
                }
              />
            </div>

            {dailyBreakImages.length >
              1 && (
              <div className="banner-dots">
                {dailyBreakImages.map(
                  (fileName, index) => (
                    <button
                      key={fileName}
                      className={`banner-dot ${
                        index ===
                        dailyBreakIndex
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setDailyBreakIndex(
                          index
                        )
                      }
                      aria-label={`Ver quadro ${
                        index + 1
                      }`}
                      type="button"
                    />
                  )
                )}
              </div>
            )}
          </>
        )}

        {/* QUEBRA POR LINHA */}

        <div className="section-title">
          QUEBRA POR LINHA
        </div>

        {!currentLineBreak ? (
          <div
            style={{
              width: "100%",
              maxWidth: 980,
              background: "#eee",
              color: "#777",
              padding: 12,
              borderRadius: 12,
            }}
          >
            Carregando Quebra por Linha...
          </div>
        ) : (
          <>
            <div
              className="banner-dinamico"
              onTouchStart={
                handleTouchStart
              }
              onTouchMove={
                handleTouchMove
              }
              onTouchEnd={() =>
                handleTouchEnd("line")
              }
            >
              {lineBreakImages.length >
                1 && (
                <>
                  <ArrowButton
                    side="left"
                    title="Anterior"
                    onClick={() =>
                      setLineBreakIndex(
                        (previous) =>
                          (previous -
                            1 +
                            lineBreakImages.length) %
                          lineBreakImages.length
                      )
                    }
                  />

                  <ArrowButton
                    side="right"
                    title="Próximo"
                    onClick={() =>
                      setLineBreakIndex(
                        (previous) =>
                          (previous +
                            1) %
                          lineBreakImages.length
                      )
                    }
                  />
                </>
              )}

              {!readyLineBreak && (
                <div className="loading-overlay">
                  Carregando…
                </div>
              )}

              <SmartImg
                src={currentLineBreak}
                alt={
                  lineBreakImages[
                    lineBreakIndex
                  ]
                }
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onLoad={() =>
                  setReadyLineBreak(
                    true
                  )
                }
              />
            </div>

            {lineBreakImages.length >
              1 && (
              <div className="banner-dots">
                {lineBreakImages.map(
                  (fileName, index) => (
                    <button
                      key={fileName}
                      className={`banner-dot ${
                        index ===
                        lineBreakIndex
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setLineBreakIndex(
                          index
                        )
                      }
                      aria-label={`Ver quadro ${
                        index + 1
                      }`}
                      type="button"
                    />
                  )
                )}
              </div>
            )}
          </>
        )}

        {/* BANNERS ESTÁTICOS */}

        {STATIC_FROM_FOLDER.map(
          (banner, index) => (
            <React.Fragment key={index}>
              {banner.title && (
                <div className="section-title">
                  {banner.title}
                </div>
              )}

              <SmartImg
                src={banner.img}
                alt={banner.title ?? ""}
                className="static-banner"
                loading="lazy"
                decoding="async"
                onErrorHide
              />
            </React.Fragment>
          )
        )}
      </main>
    </div>
  );
}
