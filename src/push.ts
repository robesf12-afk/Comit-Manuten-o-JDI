declare global {
  interface Window {
    OneSignalDeferred?: any[];
    __OS_READY__?: boolean;
  }
}

const APP_ID = "c9dee04e-1964-428a-90ec-f38dbe8c9be3"; // seu App ID

export function initPush() {
  window.OneSignalDeferred = window.OneSignalDeferred || [];

  // Marca quando o SDK efetivamente processar a fila
  window.OneSignalDeferred.push(async function (OneSignal: any) {
    window.__OS_READY__ = true;

    await OneSignal.init({
      appId: APP_ID,
      allowLocalhostAsSecureOrigin: true,
      serviceWorkerPath: "/OneSignalSDKWorker.js",
      serviceWorkerUpdaterPath: "/OneSignalSDKUpdaterWorker.js",
      serviceWorkerParam: { scope: "/" },
      notifyButton: { enable: true },
      promptOptions: { slidedown: { enabled: false, autoPrompt: false } } // vamos chamar manualmente
    });
  });
}

