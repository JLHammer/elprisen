import styled from "styled-components";
import type { ElectricityPrice } from "../../types/api";
import { formatKroner, formatTime } from "../../utils/format";
import { card } from "../../styles/card";

const PriceHourEntryStyled = styled.div<{ $current: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 6.4rem;
  align-items: center;
  ${card}
  /* The current hour glows brighter than the card's shadow */
  box-shadow: ${({ theme, $current }) => theme.boxShadows.outer($current ? 30 : 10)};
  outline: ${({ theme, $current }) => ($current ? `1px solid ${theme.colors.primary}` : "none")};
  font-weight: ${({ theme, $current }) => ($current ? theme.fontWeights.bold : "inherit")};
  padding: 0.5rem;
`;

const HourEntry = styled.p``;

const PriceEntry = styled.p<{ $level: number }>`
  color: ${({ theme, $level }) => theme.priceColors[$level]};
`;

type PriceHourEntryProps = {
  price: ElectricityPrice & { level: number };
  current?: boolean;
};

export const PriceHourEntry = ({
  price: { time_start, DKK_per_kWh, level },
  current = false,
}: PriceHourEntryProps) => (
  <PriceHourEntryStyled $current={current} aria-current={current ? "time" : undefined}>
    {/* Start time and price of the hour, e.g. "kl. 13.00" and "0.123 kr" */}
    <HourEntry>kl. {formatTime(time_start)}</HourEntry>
    <PriceEntry $level={level}>{formatKroner(DKK_per_kWh)}</PriceEntry>
  </PriceHourEntryStyled>
);
