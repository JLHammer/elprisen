import styled from "styled-components";
import { useSettings } from "../../hooks/useSettings";
import type { PriceArea } from "../../types/api";

const AREA_LABELS: Record<PriceArea, string> = {
  DK1: "Vest Danmark",
  DK2: "Øst Danmark",
};

const FooterStyled = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.4rem 2.5rem 1.5rem;
  font-size: 0.9rem;
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
        Du vises lige nu priserne for <Highlight>{AREA_LABELS[area]}</Highlight>
      </p>
    </FooterStyled>
  );
};
