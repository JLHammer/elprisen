import styled from "styled-components";

import { useElectricityPrices } from "../../hooks/useElectricityPrices";
import { useNow } from "../../hooks/useNow";
import { formatTime } from "../../utils/format";
import { isCurrentPrice } from "../../utils/priceSlot";
import { PriceCircle } from "../ui/PriceCircle";
import { renderPriceStatus } from "../ui/priceStatus";

const RightNowStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Time = styled.p`
  color: ${({ theme }) => theme.colors.primary};
`;

export const RightNowSection = () => {
  const now = useNow();
  const { prices, loading, error } = useElectricityPrices(now);

  const currentPrice = prices.find((price) => isCurrentPrice(price, now));

  const renderContent = () => {
    const status = renderPriceStatus(loading, error);
    if (status) return status;
    if (!currentPrice)
      return <p>Der er ingen pris for det nuværende tidspunkt</p>;

    return (
      <RightNowStyled>
        <PriceCircle variant="large" price={currentPrice.DKK_per_kWh} />
        {/* The time span the current price applies to, e.g. "13.00 - 14.00" */}
        <Time>
          {formatTime(currentPrice.time_start)} -{" "}
          {formatTime(currentPrice.time_end)}
        </Time>
      </RightNowStyled>
    );
  };

  return renderContent();
};
