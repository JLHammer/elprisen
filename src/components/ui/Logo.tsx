import styled from "styled-components";
import { NavLink } from "react-router";
import { HOME } from "../../router/routes";

const SITE_TITLE = "ElPrisen.nu";

type LogoProps = {
  size?: string;
};

const LogoLinkStyled = styled(NavLink)`
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  text-decoration: none;
`;

// Mobile has no room for it next to the navbar
const SiteName = styled.span`
  display: none;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  @media ${({ theme }) => theme.mediaQueries.tablet} {
    display: inline;
  }
`;

const LogoImage = styled.img<{ $size?: string }>`
  flex-shrink: 0;
  width: ${({ $size }) => $size ?? "clamp(3.5rem, 10vw, 7.5rem)"};
`;

export const Logo = ({ size }: LogoProps) => {
  return (
    // The label starts with the visible title, so voice control users can say what they see
    <LogoLinkStyled to={HOME} aria-label={`${SITE_TITLE}, forside`}>
      {/* Same file as the favicon, the PWA icons are generated from it */}
      <LogoImage src="/favicon.svg" alt="Elprisen logo" $size={size} />
      <SiteName>{SITE_TITLE}</SiteName>
    </LogoLinkStyled>
  );
};
