// src/push.ts — versão protegida
declare global {
  interface Window {
    OneSignal?: any;
  }
}

const APP_ID = "c9dee04e-1964-428a-90ec-f38dbe8c9be3";

export async function initPush() {
  try {
    // Aguarda o SDK carregar no head
    await new Promise<void>((resolve) => {
      if (window.OneSignal) return resolve();
      const t = setInterval(() => {
        if (window.OneSignal) {
          clearInterval(t);
          resolve();
        }
      }, 100);
    });

    const OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      try {
        OneSignal.init({
          appId: APP_ID,
          allowLocalhostAsSecureOrigin: true,
          notifyButton: { enable: false },
          serviceWorkerPath: "/OneSignalSDKWorker.js",
          serviceWorkerUpdaterPath: "/OneSignalSDKUpdaterWorker.js",
          serviceWorkerParam: { scope: "/" },
        });
      } catch (e) {
        console.warn("Erro ao inicializar OneSignal:", e);
      }
    });
  } catch (err) {
    console.warn("Erro no initPush:", err);
  }
}

