import styled from "styled-components";

import { useSettings } from "../../hooks/useSettings";
import { PRICE_AREAS } from "../../utils/priceArea";

// Desktop shows this under the current price instead of the footer
const PriceInfoStyled = styled.div`
  width: 14.8rem;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 4rem;
  font-size: 0.7rem;
  line-height: 1rem;
  text-align: left;
  text-transform: uppercase;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const PriceInfo = () => {
  const {
    settings: { area, includeVat },
  } = useSettings();

  return (
    <PriceInfoStyled>
      <p>
        Alle priser er{" "}
        {includeVat ? (
          <>
            <Highlight>inkl. moms</Highlight>, men eksl. afgifter.
          </>
        ) : (
          <>
            <Highlight>eksl. moms</Highlight> og afgifter.
          </>
        )}
      </p>
      <p>
        Du vises lige nu priserne for region{" "}
        <Highlight>{PRICE_AREAS[area].name}</Highlight>
      </p>
    </PriceInfoStyled>
  );
};
