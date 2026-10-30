import { MainContentWrapper } from "../components/layout/MainContentWrapper";
import { PAGE_LABELS } from "../router/routes";
import { SECTION_HEADINGS } from "../components/sections/sectionHeadings";
import { RightNowSection } from "../components/sections/RightNowSection";

const { rightNow } = PAGE_LABELS;

export const RightNowPage = () => {
  return (
    <MainContentWrapper title={rightNow} {...SECTION_HEADINGS.rightNow}>
      <RightNowSection />
    </MainContentWrapper>
  );
};
