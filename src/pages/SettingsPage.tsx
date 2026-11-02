import { MainContentWrapper } from "../components/layout/MainContentWrapper";
import { SettingsSection } from "../components/sections/SettingsSection";
import { PAGE_LABELS } from "../router/routes";

const { settings } = PAGE_LABELS;

export const SettingsPage = () => (
  <MainContentWrapper
    title={settings}
    heading={settings}
    headingSpacing="7.75rem"
  >
    <SettingsSection />
  </MainContentWrapper>
);
