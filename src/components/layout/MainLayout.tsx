import { Outlet } from "react-router";
import styled from "styled-components";

import { useIsDesktop, useIsTabletUp } from "../../hooks/useBreakpoints";
import { Footer } from "../partials/Footer";
import { Header } from "../partials/Header";
import { NavBar } from "../partials/NavBar";
import { SettingsButton } from "../partials/SettingsButton";
import { Logo } from "../ui/Logo";

// Fills the screen, so the footer sits at the bottom on pages with little content
const MainLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;

  @media ${({ theme }) => theme.mediaQueries.desktop} {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const MainLayout = () => {
  const isTabletUp = useIsTabletUp();
  const isDesktop = useIsDesktop();

  return (
    <MainLayoutStyled>
      <Header>
        <Logo size="3rem" />
        {/* Desktop shows every section on one page, so there is nothing to navigate to */}
        {!isDesktop && <NavBar />}
        {/* Mobile has the settings button on the page instead */}
        {isTabletUp && <SettingsButton />}
      </Header>

      <Main>
        <Outlet />
      </Main>

      {/* Desktop shows the price info on the dashboard instead */}
      {!isDesktop && <Footer />}
    </MainLayoutStyled>
  );
};
