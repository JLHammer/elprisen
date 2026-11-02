import { MainContentWrapper } from "../components/layout/MainContentWrapper";
import { RightNowSection } from "../components/sections/RightNowSection";
import { SECTION_HEADINGS } from "../components/sections/sectionHeadings";
import { PAGE_LABELS } from "../router/routes";

const { rightNow } = PAGE_LABELS;

export const RightNowPage = () => {
  return (
    <MainContentWrapper title={rightNow} {...SECTION_HEADINGS.rightNow}>
      <RightNowSection />
    </MainContentWrapper>
  );
};
