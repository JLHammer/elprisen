import styled from "styled-components";
import { useSettings } from "../../hooks/useSettings";
import { PRICE_AREAS } from "../../utils/priceArea";

const FooterStyled = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem;
  font-size: 1rem;
  line-height: normal;
  text-align: center;
  background: ${({ theme }) => theme.colors.backgroundDark};
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const Footer = () => {
  const {
    settings: { area, includeVat },
  } = useSettings();

  return (
    <FooterStyled>
      <p>
        Priserne er{" "}
        {includeVat ? (
          <>
            <Highlight>inkl. moms</Highlight>, men ex. afgifter
          </>
        ) : (
          <>
            <Highlight>ex. moms</Highlight> og afgifter
          </>
        )}
      </p>
      <p>
        Du vises lige nu priserne for{" "}
        <Highlight>{PRICE_AREAS[area].name}</Highlight>
      </p>
    </FooterStyled>
  );
};
