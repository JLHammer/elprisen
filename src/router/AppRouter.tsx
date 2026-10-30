import { Routes, Route, Navigate, useLocation } from "react-router";
import { HOME, ROUTES } from "./routes";
import {
  OverviewPage,
  RightNowPage,
  HistoryPage,
  DashboardPage,
  SettingsPage,
  NotFoundPage,
} from "../pages";
import { MainLayout } from "../components/layout/MainLayout";
import { useIsDesktop } from "../hooks/useBreakpoints";

const { overview, rightNow, history, settings, notFound } = ROUTES;

// Keeps the query string, so e.g. "/historik?dato=2026-10-14" becomes "/?dato=2026-10-14"
const RedirectToDashboard = () => {
  const { search } = useLocation();
  return <Navigate to={{ pathname: HOME, search }} replace />;
};

export const AppRouter = () => {
  const isDesktop = useIsDesktop();

  return (
    <Routes>
      {!isDesktop && <Route index element={<Navigate to={rightNow} replace />} />}
      <Route element={<MainLayout />}>
        {isDesktop ? (
          /*
            Desktop shows all three sections side by side on one page at "/",
            the page paths still work so links and bookmarks from mobile lead there
          */
          <>
            <Route index element={<DashboardPage />} />
            {[overview, rightNow, history].map((path) => (
              <Route key={path} path={path} element={<RedirectToDashboard />} />
            ))}
          </>
        ) : (
          <>
            <Route path={overview} element={<OverviewPage />} />
            <Route path={rightNow} element={<RightNowPage />} />
            <Route path={history} element={<HistoryPage />} />
          </>
        )}
        <Route path={settings} element={<SettingsPage />} />
        <Route path={notFound} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
