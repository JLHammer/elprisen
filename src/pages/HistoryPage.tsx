import { MainContentWrapper } from "../components/layout/MainContentWrapper";
import { PAGE_LABELS } from "../router/routes";
import { HistorySection } from "../components/sections/HistorySection";

const { history } = PAGE_LABELS;

export const HistoryPage = () => {
  return (
    <MainContentWrapper
      title={history}
      heading={history}
      headingSpacing="3.75rem"
    >
      <HistorySection />
    </MainContentWrapper>
  );
};
