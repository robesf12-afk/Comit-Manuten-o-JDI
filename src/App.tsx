import { useState } from "react";

declare global {
  interface Window { OneSignalDeferred?: any[]; }
}

export default function App() {
  const [log, setLog] = useState<string>("");

  const run = (fn: (OneSignal:any)=>Promise<void>) => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async (OneSignal:any) => {
      try { await fn(OneSignal); } catch (e:any) { setLog(String(e)); console.error(e); }
    });
  };

  const checkStatus = () => run(async (OneSignal) => {
    const permission = await OneSignal.Notifications.permission;
    const optedIn   = await OneSignal.User.PushSubscription.optedIn;
    const id        = await OneSignal.User.PushSubscription.id;
    const txt = `permission=${permission} | subscribed=${optedIn} | id=${id}`;
    setLog(txt);
    console.log(txt);
  });

  const subscribe = () => run(async (OneSignal) => {
    // Solicita permissão e assina (v16)
    await OneSignal.Slidedown.promptPush(); // se o autoPrompt estiver off
    // Alternativa direta:
    // await OneSignal.Notifications.requestPermission();
    await checkStatus();
  });

  const unsubscribe = () => run(async (OneSignal) => {
    await OneSignal.User.PushSubscription.optOut();
    await checkStatus();
  });

  return (
    <div style={{ padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h1>Comitê de Manutenção JDI</h1>
      <p>Teste de Web Push com OneSignal.</p>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:12 }}>
        <button onClick={checkStatus}>Checar status</button>
        <button onClick={subscribe}>Assinar notificações</button>
        <button onClick={unsubscribe}>Cancelar inscrição</button>
      </div>
      <pre style={{ marginTop:12, background:"#f5f5f5", padding:12, borderRadius:8 }}>
        {log || "Sem logs ainda..."}
      </pre>
    </div>
  );
}
