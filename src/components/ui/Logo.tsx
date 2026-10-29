import styled from "styled-components";
import logo from "../../assets/logo.svg";
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
      <LogoImage src={logo} alt="Elprisen logo" $size={size} />
    </LogoLinkStyled>
  );
};
