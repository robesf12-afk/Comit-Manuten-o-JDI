// src/push.ts
declare global {
  interface Window {
    OneSignalDeferred?: any[];
  }
}

export function initPush() {
  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(async (OneSignal: any) => {
    await OneSignal.init({
      appId: "c9dee04e-1964-428a-90ec-f38dbe8c9be3",
      serviceWorkerPath: "/sw-v3.js",
      serviceWorkerParam: { scope: "/" },
      notifyButton: { enable: false },               // sem UI
      promptOptions: { slidedown: { prompts: [] } }, // sem UI
    });

    // 🔸 NOVO: pede a permissão (mostra apenas o pop-up nativo do navegador)
    try {
      await OneSignal.Notifications.requestPermission();
    } catch {}

    // (opcional) tags
    try {
      await OneSignal.User.addTag("comite", "manutencao");
      await OneSignal.User.addTag("site", "jdi");
    } catch {}
  });
}

