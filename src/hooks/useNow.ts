import { useEffect, useState } from "react";

const TICK_INTERVAL = 60 * 1000;

export const useNow = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), TICK_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return now;
};
