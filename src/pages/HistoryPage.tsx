import { MainContentWrapper } from "../components/layout/MainContentWrapper";
import { HistorySection } from "../components/sections/HistorySection";
import { SECTION_HEADINGS } from "../components/sections/sectionHeadings";
import { PAGE_LABELS } from "../router/routes";

const { history } = PAGE_LABELS;

export const HistoryPage = () => {
  return (
    <MainContentWrapper title={history} {...SECTION_HEADINGS.history}>
      <HistorySection />
    </MainContentWrapper>
  );
};
