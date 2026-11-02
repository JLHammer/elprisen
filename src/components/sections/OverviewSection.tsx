import { useId, useState } from "react";
import styled from "styled-components";

import { useIsDesktop } from "../../hooks/useBreakpoints";
import { useUpcomingPrices } from "../../hooks/useUpcomingPrices";
import { ExpandToggle } from "../ui/ExpandToggle";
import { PriceHourEntry, PriceHourList } from "../ui/PriceHourEntry";
import { renderPriceStatus } from "../ui/priceStatus";
import { VisuallyHidden } from "../ui/VisuallyHidden";

// Hours shown before "Se fremtidige" opens the rest
const VISIBLE_HOURS = 8;

const OverviewStyled = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

// Past hours are unlit cards dimmed towards the page, with faded times. Not opacity: 0.5, which made the prices too faint to read
const EarlierList = styled(PriceHourList)`
  li {
    box-shadow: none;
    background-color: ${({ theme }) =>
      `color-mix(in srgb, ${theme.colors.background} 25%, ${theme.colors.backgroundDark})`};
  }

  li > p:first-child {
    color: ${({ theme }) => `color-mix(in srgb, ${theme.colors.text} 55%, transparent)`};
  }

  &[hidden] {
    display: none;
  }
`;

// The upcoming hours, which "Se fremtidige" shows more of
const LaterPrices = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const DayDivider = styled.h3`
  margin-top: 1rem;
  font-size: 0.9rem;
  text-transform: uppercase;
`;

export const OverviewSection = () => {
  const earlierId = useId();
  const laterId = useId();
  const { prices, earlierPrices, loading, error } = useUpcomingPrices();
  const [showEarlier, setShowEarlier] = useState(false);
  const [showLater, setShowLater] = useState(false);
  // Desktop has room for the whole list, so it skips the expand buttons
  const isDesktop = useIsDesktop();

  const renderContent = () => {
    const status = renderPriceStatus(loading, error);
    if (status) return status;
    if (prices.length === 0) return <p>Der er ingen kommende priser</p>;

    const visiblePrices =
      isDesktop || showLater ? prices : prices.slice(0, VISIBLE_HOURS);
    const todayPrices = visiblePrices.filter((price) => !price.isTomorrow);
    const tomorrowPrices = visiblePrices.filter((price) => price.isTomorrow);

    const renderEntries = (dayPrices: typeof visiblePrices) =>
      dayPrices.map((price) => (
        <PriceHourEntry
          key={price.time_start}
          price={price}
          current={price === visiblePrices[0]}
        />
      ));

    return (
      <OverviewStyled>
        {earlierPrices.length > 0 && (
          <>
            {!isDesktop && (
              <ExpandToggle
                expanded={showEarlier}
                controls={earlierId}
                opens="up"
                showLabel="Se tidligere"
                hideLabel="Skjul tidligere"
                onToggle={() => setShowEarlier(!showEarlier)}
              />
            )}
            {/* The dimming only shows sighted users that these hours are past */}
            {(isDesktop || showEarlier) && (
              <VisuallyHidden as="h3">Tidligere i dag</VisuallyHidden>
            )}
            <EarlierList id={earlierId} hidden={!isDesktop && !showEarlier}>
              {earlierPrices.map((price) => (
                <PriceHourEntry key={price.time_start} price={price} />
              ))}
            </EarlierList>
          </>
        )}
        <LaterPrices id={laterId}>
          {todayPrices.length > 0 && (
            <>
              {/* Matches "I morgen" below, and ends the "Tidligere i dag" heading above */}
              <VisuallyHidden as="h3">Resten af dagen</VisuallyHidden>
              <PriceHourList>{renderEntries(todayPrices)}</PriceHourList>
            </>
          )}
          {tomorrowPrices.length > 0 && (
            <>
              <DayDivider>I morgen</DayDivider>
              <PriceHourList>{renderEntries(tomorrowPrices)}</PriceHourList>
            </>
          )}
        </LaterPrices>
        {!isDesktop && prices.length > VISIBLE_HOURS && (
          <ExpandToggle
            expanded={showLater}
            controls={laterId}
            opens="down"
            showLabel="Se fremtidige"
            hideLabel="Skjul fremtidige"
            onToggle={() => setShowLater(!showLater)}
          />
        )}
      </OverviewStyled>
    );
  };

  return renderContent();
};
