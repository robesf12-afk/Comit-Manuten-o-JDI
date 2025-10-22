// src/App.tsx
import { useEffect, useMemo, useState } from "react";

declare global {
  interface Window {
    OneSignalDeferred?: any[];
    __OS_SDK_TAG_APPENDED__?: boolean;
    __OS_SDK_LOADED__?: boolean;
    __OS_SDK_ERROR__?: string | null;
    __OS_READY__?: boolean;
  }
}

/* =========================
   DEBUG PANEL (diagnóstico)
   ========================= */
function runOS<T = void>(fn: (OneSignal:any)=>Promise<T>) {
  return new Promise<T>((resolve, reject) => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async (OneSignal:any) => {
      try { resolve(await fn(OneSignal)); }
      catch (e) { reject(e); }
    });
  });
}

function DebugPanel() {
