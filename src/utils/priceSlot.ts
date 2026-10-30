import type { ElectricityPrice } from "../types/api";

type PriceSlot = Pick<ElectricityPrice, "time_start" | "time_end">;

// Start and end of the time slot a price applies to, in milliseconds like Date.getTime()
export const getPriceSlot = ({ time_start, time_end }: PriceSlot) => ({
  start: new Date(time_start).getTime(),
  end: new Date(time_end).getTime(),
});

export const isCurrentPrice = (price: PriceSlot, now: Date) => {
  const { start, end } = getPriceSlot(price);
  return start <= now.getTime() && now.getTime() < end;
};

export const hasPriceEnded = (price: PriceSlot, now: Date) =>
  getPriceSlot(price).end <= now.getTime();
