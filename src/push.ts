// src/push.ts
declare global {
  interface Window {
    OneSignal?: any;
    OneSignalDeferred?: any[];
  }
}

/**
 * Força o pedido de permissão SÓ se:
 * - o SDK carregou,
 * - ainda não está habilitado,
 * - e o status é "default" (usuário ainda não escolheu).
 * É idempotente e não quebra se OneSignal não existir.
 */
export function promptPushIfNeeded() {
  const tryPrompt = () => {
    const OS = (window as any).OneSignal;
    if (!OS || typeof OS === "function") {
      // v16 injeta um array/função antes do SDK real; espera mais um pouco
      setTimeout(tryPrompt, 400);
      return;
    }

    // Checa se já está habilitado
    OS.isPushNotificationsEnabled?.().then((enabled: boolean) => {
      if (enabled) return;

      // Tenta descobrir o status de permissão. Se for "default", mostramos o slidedown.
      const statusApi = OS.User?.Permission?.getStatus;
      if (statusApi) {
        statusApi().then((status: string) => {
          if (status === "default") {
            OS.showSlidedownPrompt?.(); // UI padrão do OneSignal
          }
        });
      } else {
        // fallback: tenta mesmo assim
        OS.showSlidedownPrompt?.();
      }
    });
  };

  // Aguarda o SDK inicializar (definido em index.html)
  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(tryPrompt);
}
