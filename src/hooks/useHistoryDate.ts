import { useEffect } from "react";
import { useSearchParams } from "react-router";

import { getDanishDate } from "../utils/danishTime";

const DATE_PARAM = "dato";

const isValidDate = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
};

export const useHistoryDate = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get(DATE_PARAM);
  const date = param && isValidDate(param) ? param : getDanishDate();

  const writeDate = (value: string, replace = false) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set(DATE_PARAM, value);
        return next;
      },
      { replace },
    );
  };

  useEffect(() => {
    if (param !== date) writeDate(date, true);
  });

  const setDate = (value: string) => {
    if (isValidDate(value)) writeDate(value);
  };

  return { date, setDate };
};
