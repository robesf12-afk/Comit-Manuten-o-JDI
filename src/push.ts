// src/push.ts
declare global {
  interface Window {
    OneSignal?: any;
    OneSignalDeferred?: any[];
  }
}

type PushDiag = {
  ok: boolean;
  enabled: boolean;
  permission: string;
  isSupported: boolean;
  subscriptionId?: string | null;
  lastError?: string | null;
};

/** Espera o SDK v16 ficar pronto (OneSignalDeferred) */
function whenOneSignal(): Promise<any> {
  return new Promise((resolve) => {
    (window as any).OneSignalDeferred = (window as any).OneSignalDeferred || [];
    (window as any).OneSignalDeferred.push((OneSignal: any) => resolve(OneSignal));
  });
}

/** Lê estado + diagnósticos */
export async function readDiagnostics(): Promise<PushDiag> {
  try {
    const OneSignal = await whenOneSignal();
    const isSupported = !!(await OneSignal.Notifications?.isPushSupported?.());
    const enabled = !!(await OneSignal.isPushNotificationsEnabled?.());
    const permission =
      (await OneSignal.User?.Permission?.getStatus?.()) ??
      (typeof Notification !== "undefined" ? Notification.permission : "unsupported");

    let subscriptionId: string | null = null;
    try {
      subscriptionId = (await OneSignal.User?.Push?.getSubscriptionId?.()) ?? null;
    } catch {}

    return { ok: true, enabled, permission, isSupported, subscriptionId, lastError: null };
  } catch (e: any) {
    return {
      ok: false,
      enabled: false,
      permission: "unknown",
      isSupported: false,
      subscriptionId: null,
      lastError: String(e?.message || e),
    };
  }
}

/** Pede permissão (v16 + fallbacks) */
async function requestPermission() {
  const OneSignal = await whenOneSignal();

  if (OneSignal.showSlidedownPrompt) {
    await OneSignal.showSlidedownPrompt();
    return;
  }
  if (OneSignal.Notifications?.requestPermission) {
    await OneSignal.Notifications.requestPermission();
    return;
  }
  if (typeof Notification !== "undefined" && Notification.requestPermission) {
    await Notification.requestPermission();
  }
}

/** Força inscrição (tenta todas as APIs conhecidas) */
async function ensureSubscribed(): Promise<string | null> {
  const OneSignal = await whenOneSignal();
  let subId: string | null = null;

  // API nova
  if (OneSignal.User?.Push?.enable) {
    await OneSignal.User.Push.enable();
  }
  // Compat/legado
  if (OneSignal.registerForPushNotifications) {
    await OneSignal.registerForPushNotifications({ modalPrompt: false });
  }
  // Slidedown (alguns projetos ainda usam)
  if (OneSignal.Slidedown?.promptPush) {
    await OneSignal.Slidedown.promptPush();
  }

  try {
    subId = (await OneSignal.User?.Push?.getSubscriptionId?.()) ?? null;
  } catch {}
  return subId;
}

/** Fluxo completo + retorno com diagnóstico */
export async function activatePush(): Promise<PushDiag> {
  const OneSignal = await whenOneSignal();

  // Esconde CTA quando mudar para inscrito
  OneSignal.on?.("subscriptionChange", (sub: boolean) => {
    if (sub) window.dispatchEvent(new Event("push-enabled"));
  });

  let diag = await readDiagnostics();
  if (diag.enabled) {
    window.dispatchEvent(new Event("push-enabled"));
    return diag;
  }

  // se ainda não concedeu, pede
  if (diag.permission !== "granted") {
    await requestPermission();
  }

  try {
    const subId = await ensureSubscribed();
    diag = await readDiagnostics();
    if (!diag.subscriptionId && subId) diag.subscriptionId = subId;
    if (diag.enabled) window.dispatchEvent(new Event("push-enabled"));
    return diag;
  } catch (e: any) {
    const err = String(e?.message || e);
    return { ...(await readDiagnostics()), lastError: err };
  }
}

/** Compat com main.tsx: dispara o prompt se ainda não estiver inscrito */
export async function promptPushIfNeeded() {
  try {
    const d = await readDiagnostics();
    // já inscrito ou bloqueado → não faz nada
    if (d.enabled || d.permission === "denied") return;

    const r = await activatePush();

    // se inscreveu, avisa o app para esconder o CTA
    if (r.enabled) {
      window.dispatchEvent(new Event("push-enabled"));
    }
  } catch {
    // silencioso
  }
}

