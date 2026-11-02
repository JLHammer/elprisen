import { BrowserRouter } from "react-router";
import { ThemeProvider } from "styled-components";

import { LowestPriceToast } from "./components/partials/LowestPriceToast";
import { OfflineReadyToast } from "./components/partials/OfflineReadyToast";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import { ToastStack } from "./components/ui/Toast";
import { SettingsProvider } from "./context/SettingsProvider";
import { AppRouter } from "./router/AppRouter";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/theme";

export const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {/* Inside the theme so the fallback is styled, outside everything that could throw */}
    <ErrorBoundary>
      <SettingsProvider>
        <BrowserRouter>
          <AppRouter />
          <ToastStack>
            <OfflineReadyToast />
            <LowestPriceToast />
          </ToastStack>
        </BrowserRouter>
      </SettingsProvider>
    </ErrorBoundary>
  </ThemeProvider>
);
