import { Fragment, useId, useState } from "react";
import styled from "styled-components";
import { useUpcomingPrices } from "../../hooks/useUpcomingPrices";
import { formatTime } from "../../utils/format";
import { getHighestPrice, getLowestPrice } from "../../utils/priceRange";
import { ExpandToggle } from "../ui/ExpandToggle";
import { PriceCircle } from "../ui/PriceCircle";
import { PriceHourEntry } from "../ui/PriceHourEntry";
import { renderPriceStatus } from "../ui/priceStatus";

// Hours shown before "Se fremtidige" opens the rest
const VISIBLE_HOURS = 8;

const OverviewStyled = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const PriceExtremesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 2rem;
`;

const Label = styled.p`
  font-size: 1rem;
  text-transform: uppercase;
`;

const SlotTime = styled.p`
  font-size: 0.9rem;
`;

const PriceHourList = styled.div`
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

  const renderContent = () => {
    const status = renderPriceStatus(loading, error);
    if (status) return status;
    if (prices.length === 0) return <p>Der er ingen kommende priser</p>;

    const extremes = [
      { label: "Laveste pris", price: getLowestPrice(prices) },
      { label: "Højeste pris", price: getHighestPrice(prices) },
    ];

    const visiblePrices = showLater ? prices : prices.slice(0, VISIBLE_HOURS);

    return (
      <>
        <OverviewStyled>
          {extremes.map(({ label, price }) => (
            <PriceExtremesContainer key={label}>
              <PriceCircle variant="small" price={price.DKK_per_kWh} />
              <Label>{label}</Label>
              <SlotTime>
                {price.isTomorrow && "I morgen "}kl. {formatTime(price.time_start)}
              </SlotTime>
            </PriceExtremesContainer>
          ))}
        </OverviewStyled>
        <PriceHourList id={laterId}>
          {earlierPrices.length > 0 && (
            <>
              <ExpandToggle
                expanded={showEarlier}
                controls={earlierId}
                opens="up"
                showLabel="Se tidligere"
                hideLabel="Skjul tidligere"
                onToggle={() => setShowEarlier(!showEarlier)}
              />
              <EarlierList id={earlierId} hidden={!showEarlier}>
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
          {prices.length > VISIBLE_HOURS && (
            <ExpandToggle
              expanded={showLater}
              controls={laterId}
              opens="down"
              showLabel="Se fremtidige"
              hideLabel="Skjul fremtidige"
              onToggle={() => setShowLater(!showLater)}
            />
          )}
        </PriceHourList>
      </>
    );
  };

  return renderContent();
};
