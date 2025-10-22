// src/App.tsx
import { useEffect, useMemo, useState } from "react";

declare global {
  interface Window {
    OneSignalDeferred?: any[];
    __OS_SDK_TAG_APPENDED__?: boolean;
    __OS_SDK_LOADED__?: boolean;
    __OS_SDK_ERROR__?: string | null;
    __OS_READY__?: boolean;
  }
}

/* =========================
   DEBUG PANEL (diagnóstico)
   ========================= */
function runOS<T = void>(fn: (OneSignal:any)=>Promise<T>) {
  return new Promise<T>((resolve, reject) => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async (OneSignal:any) => {
      try { resolve(await fn(OneSignal)); }
      catch (e) { reject(e); }
    });
  });
}

function DebugPanel() {
  const [log, setLog] = useState<string>("Sem logs ainda...");
  const [diag, setDiag] = useState<any>({
    sdkTagAppended: false,
    sdkLoaded: false,
    sdkError: null as string | null,
    osReady: false,
    workerOk: null as null | boolean,
    updaterOk: null as null | boolean,
  });

  async function checkWorkers() {
    try {
      const r1 = await fetch("/OneSignalSDKWorker.js", { method: "GET", cache: "no-store" });
      const r2 = await fetch("/OneSignalSDKUpdaterWorker.js", { method: "GET", cache: "no-store" });
      setDiag((d:any) => ({ ...d, workerOk: r1.ok, updaterOk: r2.ok }));
    } catch {
      setDiag((d:any) => ({ ...d, workerOk: false, updaterOk: false }));
    }
  }

  function refreshFlags() {
    setDiag((d:any) => ({
      ...d,
      sdkTagAppended: !!window.__OS_SDK_TAG_APPENDED__,
      sdkLoaded: !!window.__OS_SDK_LOADED__,
      sdkError: window.__OS_SDK_ERROR__ || null,
      osReady: !!window.__OS_READY__,
    }));
  }

  useEffect(() => {
    refreshFlags();
    checkWorkers();
    const t = setInterval(() => refreshFlags(), 800);
    return () => clearInterval(t);
  }, []);

  const checkStatus = async () => {
    try {
      const { permission } = await runOS(async (OneSignal) => ({
        permission: await OneSignal.Notifications.permission
      }));
      const optedIn = await runOS(async (OneSignal) => await OneSignal.User.PushSubscription.optedIn);
      const id      = await runOS(async (OneSignal) => await OneSignal.User.PushSubscription.id);
      const txt = `permission=${permission} | subscribed=${optedIn} | id=${id}`;
      setLog(txt);
      console.log(txt);
    } catch (e:any) {
      setLog("Erro ao checar status: " + (e?.message || String(e)));
    }
  };

  const subscribe = async () => {
    try {
      await runOS(async (OneSignal) => await OneSignal.Notifications.requestPermission());
      await checkStatus();
    } catch (e:any) {
      setLog("Erro ao assinar: " + (e?.message || String(e)));
    }
  };

  const unsubscribe = async () => {
    try {
      await runOS(async (OneSignal) => await OneSignal.User.PushSubscription.optOut());
      await checkStatus();
    } catch (e:any) {
      setLog("Erro ao cancelar inscrição: " + (e?.message || String(e)));
    }
  };

  const tips = useMemo(() => {
    const arr: string[] = [];
    if (!diag.sdkTagAppended) arr.push("SDK não foi anexado no <head>.");
    if (diag.sdkError) arr.push("Falha ao baixar o SDK v16 (rede/CSP/AdBlock?).");
    if (diag.sdkLoaded && !diag.osReady) arr.push("SDK carregou mas OneSignal.init ainda não rodou.");
    if (diag.workerOk === false || diag.updaterOk === false) arr.push("Workers não estão acessíveis na raiz.");
    return arr;
  }, [diag]);

  return (
    <div style={{ padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h1>Comitê de Manutenção JDI</h1>
      <p>Teste de Web Push com OneSignal.</p>

      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:12 }}>
        <button onClick={checkStatus}>Checar status</button>
        <button onClick={subscribe}>Assinar notificações</button>
        <button onClick={unsubscribe}>Cancelar inscrição</button>
        <a href="#app"><button>Voltar ao app</button></a>
      </div>

      <h3 style={{ marginTop:16 }}>Diagnóstico</h3>
      <ul>
        <li>SDK tag anexada: <b>{String(diag.sdkTagAppended)}</b></li>
        <li>SDK carregado: <b>{String(diag.sdkLoaded)}</b> {diag.sdkError ? `— ${diag.sdkError}` : ""}</li>
        <li>OneSignal pronto (init rodou): <b>{String(diag.osReady)}</b></li>
        <li>Worker raiz OK: <b>{diag.workerOk === null ? "verificando..." : String(diag.workerOk)}</b></li>
        <li>Updater worker OK: <b>{diag.updaterOk === null ? "verificando..." : String(diag.updaterOk)}</b></li>
      </ul>

      {tips.length > 0 && (
        <>
          <h4>Sugestões</h4>
          <ol>{tips.map((t,i)=><li key={i}>{t}</li>)}</ol>
        </>
      )}

      <pre style={{ marginTop:12, background:"#f5f5f5", padding:12, borderRadius:8 }}>
        {log}
      </pre>
    </div>
  );
}

/* =============
   APP (padrão)
   ============= */
function MainApp() {
  return (
    <div style={{ padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h1>Comitê de Manutenção JDI</h1>
      <p>Bem-vinda de volta ao app 👋</p>

      {/* TODO: aqui você coloca seus cards, links, páginas etc. */}
      <p style={{ marginTop: 8 }}>
        Dica: para abrir o diagnóstico quando quiser
