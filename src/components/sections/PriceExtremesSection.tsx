import styled from "styled-components";

import { useUpcomingPrices } from "../../hooks/useUpcomingPrices";
import { formatTime } from "../../utils/format";
import { getHighestPrice, getLowestPrice } from "../../utils/priceRange";
import { PriceCircle } from "../ui/PriceCircle";

const PriceExtremesStyled = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;

  /* Desktop shows it under the current price, which has no spacing below it */
  @media ${({ theme }) => theme.mediaQueries.desktop} {
    margin-top: 4rem;
  }
`;

const PriceExtreme = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 2rem;
`;

// Moved below the circle, which comes last in the markup so screen readers read the label first
const Label = styled.p`
  order: 1;
  font-size: 1rem;
  text-transform: uppercase;
`;

const SlotTime = styled.p`
  order: 1;
  font-size: 0.9rem;
`;

export const PriceExtremesSection = () => {
  const { prices, loading, error } = useUpcomingPrices();

  // The section it sits next to already shows the loading and error messages
  if (loading || error || prices.length === 0) return null;

  const extremes = [
    { label: "Laveste pris", price: getLowestPrice(prices) },
    { label: "Højeste pris", price: getHighestPrice(prices) },
  ];

  return (
    <PriceExtremesStyled>
      {extremes.map(({ label, price }) => (
        <PriceExtreme key={label}>
          <Label>{label}</Label>
          {/* When that price starts, e.g. "kl. 13.00" or "I morgen kl. 13.00" */}
          <SlotTime>
            {price.isTomorrow && "I morgen "}kl. {formatTime(price.time_start)}
          </SlotTime>
          <PriceCircle variant="small" price={price.DKK_per_kWh} />
        </PriceExtreme>
      ))}
    </PriceExtremesStyled>
  );
};
