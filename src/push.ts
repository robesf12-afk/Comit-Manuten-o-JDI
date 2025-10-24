// src/push.ts
declare global {
  interface Window { OneSignalDeferred?: any[] }
}

export function initPush() {
  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(async (OneSignal: any) => {
    await OneSignal.init({
      appId: "c9dee04e-1964-428a-90ec-f38dbe8c9be3",
      serviceWorkerPath: "/sw-v3.js",
      serviceWorkerParam: { scope: "/" },

      // Sem “sininho” fixo (não muda o layout)
      notifyButton: { enable: false },

      // Prompt automático (banner do OneSignal)
      promptOptions: {
        slidedown: {
          prompts: [
            {
              type: "push",
              autoPrompt: true,   // mostra sozinho na primeira visita
              timeDelay: 1,       // segundos após carregar
              text: {
                actionMessage: "Deseja receber avisos do Comitê de Manutenção JDI?",
                acceptButton: "Permitir",
                cancelButton: "Agora não"
              }
            }
          ]
        }
      }
    });

    // Fallback: se ainda estiver sem permissão, pede no 1º clique/toque
    try {
      const status = await OneSignal.Notifications.getPermissionStatus(); // "default" | "granted" | "denied"
      if (status === "default") {
        const onFirstInteraction = async () => {
          try { await OneSignal.Notifications.requestPermission(); } catch {}
        };
        window.addEventListener("click", onFirstInteraction, { once: true, passive: true });
        window.addEventListener("touchstart", onFirstInteraction, { once: true, passive: true });
      }
    } catch {}
  });
}
