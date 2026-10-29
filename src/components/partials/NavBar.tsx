import styled from "styled-components";
import { NavLink } from "react-router";
import { NAV_LINKS } from "../../router/routes";

const NavbarStyled = styled.nav`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`;

const MenuLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: 0.5rem;
  border-radius: 0.25rem;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const NavBar = () => {
  return (
    <NavbarStyled aria-label="Hovedmenu">
      {NAV_LINKS.map(({ path, label }) => (
        <MenuLink key={path} to={path} end>
          {label}
        </MenuLink>
      ))}
    </NavbarStyled>
  );
};
