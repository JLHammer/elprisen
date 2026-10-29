import styled from "styled-components";
import { Outlet } from "react-router";
import { Header } from "../partials/Header";
import { Footer } from "../partials/Footer";
import { NavBar } from "../partials/NavBar";
import { Logo } from "../ui/Logo";

const MainStyled = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100dvh;
  padding: 0.5rem;
`;

export const MainLayout = () => {
  return (
    <>
      <Header>
        <Logo size="3rem" />
        <NavBar />
      </Header>

      <MainStyled>
        <Outlet />
      </MainStyled>

      <Footer />
    </>
  );
};
