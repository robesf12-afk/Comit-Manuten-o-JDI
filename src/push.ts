// src/push.ts
declare global {
  interface Window {
    OneSignalDeferred?: any[];
  }
}

/**
 * Inicializa o OneSignal sem alterar nada visual:
 * - Sem prompt automático
 * - Sem botão/sino visível
 * - Usa o mesmo Service Worker do app (/sw-v3.js)
 */
export function initPush() {
  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(async function (OneSignal: any) {
    await OneSignal.init({
      appId: "c9dee04e-1964-428a-90ec-f38dbe8c9be3",
      serviceWorkerPath: "/sw-v3.js",
      serviceWorkerParam: { scope: "/" },

      // Nada visível para o usuário:
      notifyButton: { enable: false },
      promptOptions: { slidedown: { prompts: [] } },
    });

    // (Opcional) tags para segmentação futura
    try {
      await OneSignal.User.addTag("comite", "manutencao");
      await OneSignal.User.addTag("site", "jdi");
    } catch (e) {
      console.warn("[OneSignal] Falha ao enviar tags (ok ignorar no dev):", e);
    }

    // Log útil (para você ver em DevTools)
    try {
      const perm = await OneSignal.Notifications.getPermissionStatus();
      console.log("[OneSignal] Permissão:", perm);
    } catch {}
  });
}
