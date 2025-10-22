// src/push.ts
declare global {
  interface Window {
    OneSignal?: any;
    __onesignal_init_done__?: boolean;
  }
}

const APP_ID = "c9dee04e-1964-428a-90ec-f38dbe8c9be3"; // seu App ID do OneSignal

function waitOneSignal(): Promise<any> {
  return new Promise((resolve) => {
    // já carregou?
    if (window.OneSignal) return resolve(window.OneSignal);

    // espera o SDK ser carregado (foi adicionado no <head> do index.html)
    const t = setInterval(() => {
      if (window.OneSignal) {
        clearInterval(t);
        resolve(window.OneSignal);
      }
    }, 50);
  });
}

export async function initPush() {
  try {
    // evita init duplicado em navegações/fast refresh
    if (window.__onesignal_init_done__) return;
    const OneSignal = await waitOneSignal();

    OneSignal.push(function () {
      OneSignal.init({
        appId: APP_ID,
        allowLocalhostAsSecureOrigin: true,
        // Deixe o OneSignal mostrar automaticamente o prompt (slide)
        promptOptions: {
          slidedown: {
            prompts: [
              {
                type: "push",
                autoPrompt: true, // <- auto prompt ativado
                text: {
                  actionMessage:
                    "Quer receber avisos do Comitê de Manutenção?",
                  acceptButton: "Permitir",
                  cancelButton: "Depois",
                },
              },
            ],
          },
        },
        notifyButton: { enable: false },
      });

      window.__onesignal_init_done__ = true;
    });
  } catch (e) {
    console.warn("OneSignal init falhou:", e);
  }
}
