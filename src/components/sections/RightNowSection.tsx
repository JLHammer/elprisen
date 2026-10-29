import styled from "styled-components";
import { useElectricityPrices } from "../../hooks/useElectricityPrices";
import { useNow } from "../../hooks/useNow";
import { formatPrice, formatTime } from "../../utils/format";
import { PriceCircle } from "../ui/PriceCircle";

const RightNowStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Price = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;
  line-height: 1;
  gap: 0.25rem;
`;

const Amount = styled.span``;

const Unit = styled.span`
  font-size: 1.1rem;
`;

const Time = styled.p`
  color: ${({ theme }) => theme.colors.primary};
`;

export const RightNowSection = () => {
  const now = useNow();
  const { prices, loading, error } = useElectricityPrices(now);

  const nowTime = now.getTime();
  const currentPrice = prices.find(
    ({ time_start, time_end }) =>
      new Date(time_start).getTime() <= nowTime &&
      nowTime < new Date(time_end).getTime(),
  );

  const renderContent = () => {
    if (loading) return <p>Henter elpriser…</p>;
    if (error) return <p role="alert">{error}</p>;
    if (!currentPrice)
      return <p>Der er ingen pris for det nuværende tidspunkt</p>;

    return (
      <RightNowStyled>
        <PriceCircle variant="large">
          <Price>
            <Amount>{formatPrice(currentPrice.DKK_per_kWh)} kr</Amount>
            <Unit>pr. kWh</Unit>
          </Price>
        </PriceCircle>
        <Time>
          {formatTime(currentPrice.time_start)} -{" "}
          {formatTime(currentPrice.time_end)}
        </Time>
      </RightNowStyled>
    );
  };

  return renderContent();
};
