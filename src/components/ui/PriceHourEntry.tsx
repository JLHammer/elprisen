import styled from "styled-components";
import type { ElectricityPrice } from "../../types/api";
import { formatPrice, formatTime } from "../../utils/format";

const PriceHourEntryStyled = styled.div<{ $current: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 6.4rem;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundDark};
  border-radius: 0.25rem;
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
    <HourEntry>kl. {formatTime(time_start)}</HourEntry>
    <PriceEntry $level={level}>{formatPrice(DKK_per_kWh)} kr</PriceEntry>
  </PriceHourEntryStyled>
);
