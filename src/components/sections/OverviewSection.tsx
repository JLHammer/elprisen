import { Fragment, useId, useState } from "react";
import styled from "styled-components";
import { useUpcomingPrices } from "../../hooks/useUpcomingPrices";
import { useIsDesktop } from "../../hooks/useBreakpoints";
import { ExpandToggle } from "../ui/ExpandToggle";
import { PriceHourEntry } from "../ui/PriceHourEntry";
import { renderPriceStatus } from "../ui/priceStatus";

// Hours shown before "Se fremtidige" opens the rest
const VISIBLE_HOURS = 8;

const OverviewStyled = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const EarlierList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: 0.5;

  &[hidden] {
    display: none;
  }
`;

const DayDivider = styled.p`
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

    return (
      <OverviewStyled id={laterId}>
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
            <EarlierList id={earlierId} hidden={!isDesktop && !showEarlier}>
              {earlierPrices.map((price) => (
                <PriceHourEntry key={price.time_start} price={price} />
              ))}
            </EarlierList>
          </>
        )}
        {visiblePrices.map((price, index) => (
          <Fragment key={price.time_start}>
            {price.isTomorrow && !visiblePrices[index - 1]?.isTomorrow && (
              <DayDivider>I morgen</DayDivider>
            )}
            <PriceHourEntry price={price} current={index === 0} />
          </Fragment>
        ))}
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
