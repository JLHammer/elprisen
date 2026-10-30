import styled from "styled-components";
import { Outlet } from "react-router";
import { Header } from "../partials/Header";
import { Footer } from "../partials/Footer";
import { NavBar } from "../partials/NavBar";
import { Logo } from "../ui/Logo";
import { useIsDesktop } from "../../hooks/useBreakpoints";

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
  const isDesktop = useIsDesktop();

  return (
    <MainLayoutStyled>
      <Header>
        <Logo size="3rem" />
        {/* Desktop shows every section on one page, so there is nothing to navigate to */}
        {!isDesktop && <NavBar />}
      </Header>

      <Main>
        <Outlet />
      </Main>

      {/* Desktop shows the price info on the dashboard instead */}
      {!isDesktop && <Footer />}
    </MainLayoutStyled>
  );
};
