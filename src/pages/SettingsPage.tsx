import { MainContentWrapper } from "../components/layout/MainContentWrapper";
import { PAGE_LABELS } from "../router/routes";
import { SettingsSection } from "../components/sections/SettingsSection";

const { settings } = PAGE_LABELS;

export const SettingsPage = () => {
  return (
    <MainContentWrapper
      title={settings}
      heading={settings}
      headingSpacing="7.75rem"
    >
      <SettingsSection />
    </MainContentWrapper>
  );
};
