import styled from "styled-components";
import { NavLink } from "react-router";
import { ROUTES } from "../../router/routes";

type LogoProps = {
  size?: string;
};

type LogoImageProps = {
  $size?: string;
};

const LogoLinkStyled = styled(NavLink)`
  overflow: hidden;
`;

const LogoImage = styled.img<LogoImageProps>`
  flex-shrink: 0;
  width: ${({ $size }) => $size ?? "clamp(3.5rem, 10vw, 7.5rem)"};
`;

export const Logo = ({ size }: LogoProps) => {
  return (
    <LogoLinkStyled to={ROUTES.rightNow} aria-label="Hjem">
      {/* Same file as the favicon, the PWA icons are generated from it */}
      <LogoImage src="/favicon.svg" alt="Elprisen logo" $size={size} />
    </LogoLinkStyled>
  );
};
