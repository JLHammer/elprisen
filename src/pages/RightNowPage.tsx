import { MainContentWrapper } from "../components/layout/MainContentWrapper";
import { PAGE_LABELS } from "../router/routes";
import { RightNowSection } from "../components/sections/RightNowSection";

const { rightNow } = PAGE_LABELS;

export const RightNowPage = () => {
  return (
    <MainContentWrapper
      title={rightNow}
      heading="Elprisen lige nu"
      headingSpacing="4.1rem"
    >
      <RightNowSection />
    </MainContentWrapper>
  );
};
