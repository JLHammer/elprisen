import { MainContentWrapper } from "../components/layout/MainContentWrapper";
import { PAGE_LABELS } from "../router/routes";
import { SECTION_HEADINGS } from "../components/sections/sectionHeadings";
import { HistorySection } from "../components/sections/HistorySection";

const { history } = PAGE_LABELS;

export const HistoryPage = () => {
  return (
    <MainContentWrapper title={history} {...SECTION_HEADINGS.history}>
      <HistorySection />
    </MainContentWrapper>
  );
};
