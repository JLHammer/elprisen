import { useState } from "react";
import styled from "styled-components";

import { FIRST_DATE } from "../../api/prices";
import { useElectricityPrices } from "../../hooks/useElectricityPrices";
import { useHistoryDate } from "../../hooks/useHistoryDate";
import { getDanishDate } from "../../utils/danishTime";
import { formatDate } from "../../utils/format";
import { withPriceLevels } from "../../utils/priceLevel";
import { DatePicker } from "../ui/DatePicker";
import { PriceHourEntry, PriceHourList } from "../ui/PriceHourEntry";
import { renderPriceStatus } from "../ui/priceStatus";
import { VisuallyHidden } from "../ui/VisuallyHidden";

const HistoryStyled = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HistoryDatePicker = styled(DatePicker)`
  width: 100%;
  margin-bottom: 3rem;
`;

const Heading = styled.h3`
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-transform: uppercase;
`;

export const HistorySection = () => {
  const { date, setDate } = useHistoryDate();
  // Only announces dates the user picked, not the one the page opened with
  const [datePicked, setDatePicked] = useState(false);
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
      <HistoryDatePicker
        label="Vælg dato"
        value={date}
        min={FIRST_DATE}
        max={getDanishDate(1)}
        onChange={(value) => {
          setDatePicked(true);
          setDate(value);
        }}
      />
      {/* Puts the selected date in the heading, e.g. "Elpriserne d. 30-10-2026" */}
      <Heading>Elpriserne d. {formatDate(date)}</Heading>
      {/* Confirms a picked date once its prices are shown, errors announce themselves */}
      <VisuallyHidden role="status">
        {datePicked &&
          !loading &&
          !error &&
          `Viser elpriserne d. ${formatDate(date)}`}
      </VisuallyHidden>
      {renderContent()}
    </HistoryStyled>
  );
};
