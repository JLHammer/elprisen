import { Fragment } from "react";
import styled from "styled-components";
import { useUpcomingPrices } from "../../hooks/useUpcomingPrices";
import { formatPrice, formatTime } from "../../utils/format";
import { getHighestPrice, getLowestPrice } from "../../utils/priceRange";
import { PriceCircle } from "../ui/PriceCircle";
import { PriceHourEntry } from "../ui/PriceHourEntry";

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

const Price = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;
  line-height: 1;
  gap: 0.25rem;
`;

const Amount = styled.span`
  font-size: 1.1rem;
`;

const Unit = styled.span`
  font-size: 0.7rem;
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

const DayDivider = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  text-transform: uppercase;
`;

export const OverviewSection = () => {
  const { prices, loading, error } = useUpcomingPrices();

  const renderContent = () => {
    if (loading) return <p>Henter elpriser…</p>;
    if (error) return <p role="alert">{error}</p>;
    if (prices.length === 0) return <p>Der er ingen kommende priser</p>;

    const extremes = [
      { label: "Laveste pris", price: getLowestPrice(prices) },
      { label: "Højeste pris", price: getHighestPrice(prices) },
    ];

    return (
      <>
        <OverviewStyled>
          {extremes.map(({ label, price }) => (
            <PriceExtremesContainer key={label}>
              <PriceCircle variant="small">
                <Price>
                  <Amount>{formatPrice(price.DKK_per_kWh)} kr</Amount>
                  <Unit>pr. kWh</Unit>
                </Price>
              </PriceCircle>
              <Label>{label}</Label>
              <SlotTime>
                {price.isTomorrow && "I morgen "}kl. {formatTime(price.time_start)}
              </SlotTime>
            </PriceExtremesContainer>
          ))}
        </OverviewStyled>
        <PriceHourList>
          {prices.map((price, index) => (
            <Fragment key={price.time_start}>
              {price.isTomorrow && !prices[index - 1]?.isTomorrow && (
                <DayDivider>I morgen</DayDivider>
              )}
              <PriceHourEntry price={price} current={index === 0} />
            </Fragment>
          ))}
        </PriceHourList>
      </>
    );
  };

  return renderContent();
};
