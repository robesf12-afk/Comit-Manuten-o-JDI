import { useEffect, useMemo, useState } from "react";

/* ====== OPÇÃO: habilitar/ocultar diagnóstico visual ====== */
const ENABLE_DEBUG_BUTTON = false; // deixe false para apresentação

declare global {
  interface Window {
    OneSignalDeferred?: any[];
    __OS_SDK_TAG_APPENDED__?: boolean;
    __OS_SDK_LOADED__?: boolean;
    __OS_SDK_ERROR__?: string | null;
    __OS_READY__?: boolean;
  }
}

/* Utilitário para usar a fila do OneSignal v16 */
function runOS<T = void>(fn: (OneSignal: any) => Promise<T>) {
  return new Promise<T>((resolve, reject) => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async (OneSignal: any) => {
      try {
        resolve(await fn(OneSignal));
      } catch (e) {
        reject(e);
      }
    });
  });
}

/* Painel de diagnóstico (apenas em /#debug) */
function DebugPanel() {
  const [log, setLog] = useState<string>("Sem logs ainda...");
  const [diag, setDiag] = useState({
    sdkTagAppended: false,
    sdkLoaded: false,
    sdkError: null as string | null,
    osReady: false,
    workerOk: null as boolean | null,
    updaterOk: null as boolean | null,
  });

  async function checkWorkers() {
    try {
      const r1 = await fetch("/OneSignalSDKWorker.js", { cache: "no-store" });
      const r2 = await fetch("/OneSignalSDKUpdaterWorker.js", {
        cache: "no-store",
      });
      setDiag((d) => ({ ...d, workerOk: r1.ok, updaterOk: r2.ok }));
    } catch {
      setDiag((d) => ({ ...d, workerOk: false, updaterOk: false }));
    }
  }

  function refreshFlags() {
    setDiag((d) => ({
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
    const t = setInterval(refreshFlags, 800);
    return () => clearInterval(t);
  }, []);

  const checkStatus = async () => {
    try {
      const permission = await runOS(
        async (OneSignal) => await OneSignal.Notifications.permission
      );
      const optedIn = await runOS(
        async (OneSignal) => await OneSignal.User.PushSubscription.optedIn
      );
      const id = await runOS(
        async (OneSignal) => await OneSignal.User.PushSubscription.id
      );
      const txt = `permission=${permission} | subscribed=${optedIn} | id=${id}`;
      setLog(txt);
      console.log(txt);
    } catch (e: any) {
      setLog("Erro ao checar status: " + (e?.message || String(e)));
    }
  };

  const subscribe = async () => {
    try {
      await runOS(
        async (OneSignal) =>
          await OneSignal.Notifications.requestPermission()
      );
      await checkStatus();
    } catch (e: any) {
      setLog("Erro ao assinar: " + (e?.message || String(e)));
    }
  };

  const unsubscribe = async () => {
    try {
      await runOS(
        async (OneSignal) => await OneSignal.User.PushSubscription.optOut()
      );
      await checkStatus();
    } catch (e: any) {
      setLog("Erro ao cancelar inscrição: " + (e?.message || String(e)));
    }
  };

  const tips = useMemo(() => {
    const out: string[] = [];
    if (!diag.sdkTagAppended) out.push("SDK não foi anexado no <head>.");
    if (diag.sdkError)
      out.push("Falha ao baixar o SDK v16 (rede/CSP/AdBlock?).");
    if (diag.sdkLoaded && !diag.osReady)
      out.push("SDK carregou mas OneSignal.init ainda não rodou.");
    if (diag.workerOk === false || diag.updaterOk === false)
      out.push("Workers não estão acessíveis na raiz.");
    return out;
  }, [diag]);

  return (
    <div style={{ padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h1>Comitê de Manutenção JDI</h1>
      <p>Diagnóstico do Web Push</p>

      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}
      >
