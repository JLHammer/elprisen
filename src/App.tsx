import { BrowserRouter } from "react-router";
import { ThemeProvider } from "styled-components";

import { LowestPriceToast } from "./components/partials/LowestPriceToast";
import { OfflineReadyToast } from "./components/partials/OfflineReadyToast";
import { ToastStack } from "./components/ui/Toast";
import { SettingsProvider } from "./context/SettingsProvider";
import { AppRouter } from "./router/AppRouter";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/theme";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SettingsProvider>
        <BrowserRouter>
          <AppRouter />
          <ToastStack>
            <OfflineReadyToast />
            <LowestPriceToast />
          </ToastStack>
        </BrowserRouter>
      </SettingsProvider>
    </ThemeProvider>
  );
};
