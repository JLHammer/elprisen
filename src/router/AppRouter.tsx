import { Routes, Route, Navigate } from "react-router";
import { ROUTES } from "./routes";
import {
  OverviewPage,
  RightNowPage,
  HistoryPage,
  SettingsPage,
  NotFoundPage,
} from "../pages";
import { MainLayout } from "../components/layout/MainLayout";

const { overview, rightNow, history, settings, notFound } = ROUTES;

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={rightNow} replace />} />
      <Route element={<MainLayout />}>
        <Route path={overview} element={<OverviewPage />} />
        <Route path={rightNow} element={<RightNowPage />} />
        <Route path={history} element={<HistoryPage />} />
        <Route path={settings} element={<SettingsPage />} />
        <Route path={notFound} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
