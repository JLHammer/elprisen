import { BrowserRouter } from "react-router";
import { AppRouter } from "./router/AppRouter";
import { OfflineReadyToast } from "./components/partials/OfflineReadyToast";
import { SettingsProvider } from "./context/SettingsProvider";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SettingsProvider>
        <BrowserRouter>
          <AppRouter />
          <OfflineReadyToast />
        </BrowserRouter>
      </SettingsProvider>
    </ThemeProvider>
  );
};
