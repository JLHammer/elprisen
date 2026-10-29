import styled from "styled-components";
import { useRegisterSW } from "virtual:pwa-register/react";

const updatePeriod = 60 * 60 * 1000;

const ToastStyled = styled.div``;

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
          // server unreachable, try again next interval
        }
      }, updatePeriod);
    },
  });

  if (!offlineReady) return null;

  return (
    <ToastStyled role="status">
      <p>Appen er klar til at blive brugt offline</p>
      <button type="button" onClick={() => setOfflineReady(false)}>
        Luk
      </button>
    </ToastStyled>
  );
};
