import type { ReactNode } from "react";
import styled from "styled-components";

type HeaderProps = {
  children?: ReactNode;
};

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.backgroundDark};

  @media ${({ theme }) => theme.mediaQueries.tablet} {
    justify-content: space-between;
  }
`;

export const Header = ({ children }: HeaderProps) => {
  return <HeaderStyled>{children}</HeaderStyled>;
};
