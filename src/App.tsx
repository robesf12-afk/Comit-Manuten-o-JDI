// src/push.ts
declare global {
  interface Window {
    OneSignal?: any;
    OneSignalDeferred?: any[];
    __onesignal_init_done__?: boolean;
  }
}

export type PushDiag = {
  ok: boolean;
  enabled: boolean;
  permission: NotificationPermission | "default" | "denied" | "granted";
  isSupported: boolean;
  subscriptionId?: string | null;
  lastError?: string | null;
};

/** ====== Util ====== */
function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function isIOS(): boolean {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isStandalone(): boolean {
  return (
    (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
    // @ts-ignore
    window.navigator?.standalone === true
  );
}

function browserSupportsBasics(): boolean {
  // Precisa de Notification + ServiceWorker (Web Push)
  const notif = typeof window !== "undefined" && "Notification" in window;
  const sw = typeof navigator !== "undefined" && "serviceWorker" in navigator;
  return notif && sw;
}

/** Espera o SDK v16 ficar pronto */
async function whenOneSignal(): Promise<any> {
  if (window.OneSignal) return window.OneSignal;

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  return new Promise((resolve) => {
    window.OneSignalDeferred!.push((OneSignal: any) => resolve(OneSignal));
  });
}

/** Garante init uma única vez (idempotente) */
async function ensureInit(): Promise<any> {
  const OneSignal = await whenOneSignal();
  if (!window.__onesignal_init_done__) {
    // Se você usa init explícito, deixe aqui. v16 geralmente é auto-init via data-attrs.
    // Exemplo (ajuste o appId se não estiver no index.html):
    // await OneSignal.init({ appId: "SEU-APP-ID", allowLocalhostAsSecureOrigin: true });
    window.__onesignal_init_done__ = true;
  }
  return OneSignal;
}

/** Tenta obter o subscriptionId pelos caminhos conhecidos no v16 */
async function getSubscriptionId(OneSignal: any): Promise<string | null> {
  try {
    // Caminho principal (v16)
    if (OneSignal?.User?.PushSubscription?.getId) {
      const id = await OneSignal.User.PushSubscription.getId();
      if (id) return String(id);
    }
  } catch {}

  try {
    // Em alguns cenários o token é o identificador útil
    if (OneSignal?.User?.PushSubscription?.getToken) {
      const token = await OneSignal.User.PushSubscription.getToken();
      if (token) return String(token);
    }
  } catch {}

  try {
    // Fallback: propriedades booleanas
    if (OneSignal?.User?.PushSubscription?.id) {
      return String(OneSignal.User.PushSubscription.id);
    }
  } catch {}

  return null;
}

/** Verifica se está “opted-in”/inscrito */
async function isOptedIn(OneSignal: any): Promise<boolean> {
  try {
    if (OneSignal?.User?.PushSubscription?.optedIn != null) {
      return !!OneSignal.User.PushSubscription.optedIn;
    }
  } catch {}
  // Fallback pela permissão
  return Notification.permission === "granted";
}

/** ====== API pública usada pelo App.tsx ====== */
export async function readDiagnostics(): Promise<PushDiag> {
  try {
    // 1) Suporte básico do browser
    if (!browserSupportsBasics()) {
      // iOS Safari fora do PWA também não tem web push
      const supported = !isIOS() ? false : isStandalone(); // iOS só em standalone
      return {
        ok: true,
        enabled: false,
        permission: typeof Notification !== "undefined" ? Notification.permission : "default",
        isSupported: supported,
        subscriptionId: null,
      };
    }

    // 2) OneSignal pronto
    const OneSignal = await ensureInit();

    // 3) Leitura de estado
    const permission: NotificationPermission = Notification.permission;
    const subId = await getSubscriptionId(OneSignal);
    const opted = await isOptedIn(OneSignal);

    return {
      ok: true,
      enabled: opted,
      permission,
      isSupported: true,
      subscriptionId: subId,
    };
  } catch (e: any) {
    return {
      ok: false,
      enabled: false,
      permission: typeof Notification !== "undefined" ? Notification.permission : "default",
      isSupported: browserSupportsBasics(),
      subscriptionId: null,
      lastError: String(e?.message || e),
    };
  }
}

/**
 * Fluxo de ativação:
 * - Solicita permissão ao usuário (Notifications.requestPermission)
 * - Tenta garantir inscrição (optIn / subscribe, conforme exposto no v16)
 * - Retorna diagnóstico final
 */
export async function activatePush(): Promise<PushDiag> {
  try {
    // 1) Suporte
    if (!browserSupportsBasics()) {
      // iOS Safari fora de standalone não tem push
      const supported = !isIOS() ? false : isStandalone();
      return {
        ok: false,
        enabled: false,
        permission: typeof Notification !== "undefined" ? Notification.permission : "default",
        isSupported: supported,
        subscriptionId: null,
        lastError: supported
          ? "O app precisa estar instalado na tela inicial do iPhone para habilitar push."
          : "Este navegador não suporta Web Push.",
      };
    }

    // 2) SDK pronto
    const OneSignal = await ensureInit();

    // 3) Pede permissão
    try {
      // v16: Notifications.requestPermission() retorna "granted"/"denied"/"default"
      const result = await OneSignal?.Notifications?.requestPermission?.();
      // Alguns browsers atualizam Notification.permission de forma assíncrona,
      // então aguardamos um tique curto.
      await sleep(50);
    } catch (err) {
      // Se falhar, seguimos e checamos o estado depois
    }

    // 4) Tenta garantir inscrição/opt-in (alguns ambientes já inscrevem ao conceder)
    try {
      if (OneSignal?.User?.PushSubscription?.optIn) {
        // Não faz mal chamar mesmo se já estiver optedIn
        await OneSignal.User.PushSubscription.optIn();
      } else if (OneSignal?.Notifications?.subscribe) {
        await OneSignal.Notifications.subscribe();
      }
    } catch (err) {
      // Pode falhar se já estiver inscrito; seguimos para o diagnóstico final
    }

    // 5) Diagnóstico final
    const permission: NotificationPermission = Notification.permission;
    const subId = await getSubscriptionId(OneSignal);
    const opted = await isOptedIn(OneSignal);

    return {
      ok: permission === "granted" || opted || !!subId,
      enabled: opted,
      permission,
      isSupported: true,
      subscriptionId: subId,
      lastError: permission === "denied" ? "Permissão negada nas configurações do navegador." : undefined,
    };
  } catch (e: any) {
    return {
      ok: false,
      enabled: false,
      permission: typeof Notification !== "undefined" ? Notification.permission : "default",
      isSupported: browserSupportsBasics(),
      subscriptionId: null,
      lastError: String(e?.message || e),
    };
  }
}

/** (Opcional) Helpers para quem quiser ouvir eventos no app */
export function attachOneSignalListeners() {
  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push((OneSignal: any) => {
    OneSignal.on?.("subscriptionChange", (sub: boolean) => {
      // console.log("[OneSignal] subscriptionChange:", sub);
    });
    OneSignal.on?.("notificationPermissionChange", (perm: NotificationPermission) => {
      // console.log("[OneSignal] permissionChange:", perm);
    });
  });
}
