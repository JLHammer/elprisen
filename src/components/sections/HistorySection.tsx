import styled from "styled-components";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import {
  FIRST_DATE,
  useElectricityPrices,
} from "../../hooks/useElectricityPrices";
import { useHistoryDate } from "../../hooks/useHistoryDate";
import { getDanishDate } from "../../utils/danishTime";
import { formatDate } from "../../utils/format";
import { withPriceLevels } from "../../utils/priceLevel";
import { card } from "../../styles/card";
import { Icon } from "../ui/Icon";
import { PriceHourEntry } from "../ui/PriceHourEntry";
import { renderPriceStatus } from "../ui/priceStatus";

const HistoryStyled = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DatePicker = styled.label`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.8rem;
  margin-bottom: 3rem;
  ${card}
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.hover("color", "box-shadow")};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    box-shadow: ${({ theme }) => theme.boxShadows.outer(20)};
  }

  /* The date input inside is invisible, so the label shows its focus instead */
  &:focus-within {
    color: ${({ theme }) => theme.colors.text};
    outline: ${({ theme }) => theme.focusRing.outline};
    outline-offset: ${({ theme }) => theme.focusRing.offset};
  }
`;

const DateText = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

const DateInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const Heading = styled.h2`
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-transform: uppercase;
`;

const PriceHourList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const HistorySection = () => {
  const { date, setDate } = useHistoryDate();
  const { prices, loading, error } = useElectricityPrices(
    new Date(`${date}T12:00:00Z`),
  );

  const renderContent = () => {
    const status = renderPriceStatus(loading, error);
    if (status) return status;

    return (
      <PriceHourList>
        {withPriceLevels(prices).map((price) => (
          <PriceHourEntry key={price.time_start} price={price} />
        ))}
      </PriceHourList>
    );
  };

  return (
    <HistoryStyled>
      <DatePicker>
        <DateText>{formatDate(date)}</DateText>
        <Icon icon={faCalendarAlt} size="1.4rem" />
        <DateInput
          type="date"
          aria-label="Vælg dato"
          value={date}
          min={FIRST_DATE}
          max={getDanishDate(1)}
          onChange={(e) => setDate(e.target.value)}
          onClick={(e) => e.currentTarget.showPicker?.()}
        />
      </DatePicker>
      <Heading>Elpriserne d. {formatDate(date)}</Heading>
      {renderContent()}
    </HistoryStyled>
  );
};
