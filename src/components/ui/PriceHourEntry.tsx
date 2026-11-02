import styled from "styled-components";

import { card } from "../../styles/card";
import { formatTime } from "../../utils/format";
import { getPriceLevelName, type PriceWithLevel } from "../../utils/priceLevel";
import { Kroner } from "./Kroner";
import { VisuallyHidden } from "./VisuallyHidden";

// role="list" because Safari drops the list semantics of lists styled with list-style: none
export const PriceHourList = styled.ol.attrs({ role: "list" })`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PriceHourEntryStyled = styled.li<{ $current: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  /* Shrinks on narrow screens and with enlarged text, so the price stays inside the card */
  gap: min(6.5rem, 40%);
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
  price: PriceWithLevel;
  current?: boolean;
};

export const PriceHourEntry = ({
  price: { time_start, DKK_per_kWh, level },
  current = false,
}: PriceHourEntryProps) => (
  <PriceHourEntryStyled
    $current={current}
    aria-current={current ? "time" : undefined}
  >
    {/* Start time and price of the hour, e.g. "kl. 13.00" and "0.123 kr" */}
    <HourEntry>kl. {formatTime(time_start)}</HourEntry>
    <PriceEntry $level={level}>
      <Kroner price={DKK_per_kWh} />
      <VisuallyHidden>, {getPriceLevelName(level)}</VisuallyHidden>
    </PriceEntry>
  </PriceHourEntryStyled>
);
