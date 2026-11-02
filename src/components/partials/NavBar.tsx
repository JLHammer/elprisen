import { NavLink } from "react-router";
import styled from "styled-components";

import { NAV_LINKS } from "../../router/routes";

const NavBarStyled = styled.nav`
  display: flex;
  gap: 0.25rem;
  justify-content: space-between;
`;

const MenuLink = styled(NavLink)`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  padding: 0.5rem;
  border-radius: 0.25rem;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const NavBar = () => {
  return (
    <NavBarStyled aria-label="Hovedmenu">
      {NAV_LINKS.map(({ path, label }) => (
        <MenuLink key={path} to={path} end>
          {label}
        </MenuLink>
      ))}
    </NavBarStyled>
  );
};
