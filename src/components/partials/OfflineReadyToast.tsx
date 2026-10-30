import { useRegisterSW } from "virtual:pwa-register/react";
import { Toast } from "../ui/Toast";

const UPDATE_PERIOD = 60 * 60 * 1000;

export const OfflineReadyToast = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
  } = useRegisterSW({
    immediate: true,
    onRegisteredSW(swUrl, r) {
      if (!r) return;

      setInterval(async () => {
        if (r.installing || ("onLine" in navigator && !navigator.onLine)) return;

        try {
          const resp = await fetch(swUrl, { cache: "no-store" });

          if (resp?.status === 200) await r.update();
        } catch {
          // Server unreachable, try again next interval
        }
      }, UPDATE_PERIOD);
    },
  });

  if (!offlineReady) return null;

  return <Toast onClose={() => setOfflineReady(false)}>Appen er klar til at blive brugt offline</Toast>;
};
