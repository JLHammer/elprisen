import { MainContentWrapper } from "../components/layout/MainContentWrapper";
import { PAGE_LABELS } from "../router/routes";

const { settings } = PAGE_LABELS;

export const SettingsPage = () => {
  return (
    <MainContentWrapper
      title={settings}
      heading={settings}
      headingSpacing="7.75rem"
    />
  );
};
