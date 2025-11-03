// src/push.ts
declare global {
  interface Window {
    OneSignal?: any;
    OneSignalDeferred?: any[];
  }
}

/** Aguarda o SDK v16 ficar pronto */
function whenOneSignal(): Promise<any> {
  return new Promise((resolve) => {
    (window as any).OneSignalDeferred = (window as any).OneSignalDeferred || [];
    (window as any).OneSignalDeferred.push((OneSignal: any) => resolve(OneSignal));
  });
}

/** Retorna estado atual */
export async function getPushState() {
  try {
    const OneSignal = await whenOneSignal();
    const enabled = await OneSignal.isPushNotificationsEnabled?.();
    const perm =
      (await OneSignal.User?.Permission?.getStatus?.()) ??
      (typeof Notification !== "undefined" ? Notification.permission : "unsupported");
    return { ok: true, enabled: !!enabled, permission: perm as string };
  } catch {
    return { ok: false, enabled: false, permission: "unknown" };
  }
}

/** Pede permissão (v16) */
export async function requestPermission() {
  const OneSignal = await whenOneSignal();
  // tenta a UI padrão
  if (OneSignal.showSlidedownPrompt) {
    await OneSignal.showSlidedownPrompt();
    return;
  }
  // API nova
  if (OneSignal.Notifications?.requestPermission) {
    await OneSignal.Notifications.requestPermission();
    return;
  }
  // fallback nativo
  if (typeof Notification !== "undefined" && Notification.requestPermission) {
    await Notification.requestPermission();
  }
}

/** 🔥 Força a INSCRIÇÃO após permissão concedida (tenta todas as APIs) */
export async function ensureSubscribed() {
  const OneSignal = await whenOneSignal();
  try {
    // v16 nova (algumas contas)
    if (OneSignal.User?.Push?.enable) {
      await OneSignal.User.Push.enable(); // tenta inscrever
    }
    // legado / compat
    if (OneSignal.registerForPushNotifications) {
      await OneSignal.registerForPushNotifications({ modalPrompt: false });
    }
    // em alguns ambientes, pedir permissão já inscreve; reforçamos novamente:
    if (OneSignal.Slidedown?.promptPush) {
      await OneSignal.Slidedown.promptPush(); // compat
    }
  } catch {
    // ignora
  }
}

/** Fluxo: se não inscrito → pede permissão → inscreve → dispara evento */
export async function promptPushIfNeeded() {
  const OneSignal = await whenOneSignal();

  // escuta mudança e avisa o app para esconder o banner
  OneSignal.on?.("subscriptionChange", (sub: boolean) => {
    if (sub) window.dispatchEvent(new Event("push-enabled"));
  });

  const st1 = await getPushState();
  if (st1.enabled) {
    window.dispatchEvent(new Event("push-enabled"));
    return;
  }

  // se ainda não tem "granted", pede permissão
  if (st1.permission !== "granted") {
    await requestPermission();
  }

  // força inscrição (mesmo com granted)
  await ensureSubscribed();

  const st2 = await getPushState();
  if (st2.enabled) window.dispatchEvent(new Event("push-enabled"));
}
