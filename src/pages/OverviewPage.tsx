import { MainContentWrapper } from "../components/layout/MainContentWrapper";
import { PAGE_LABELS } from "../router/routes";
import { SECTION_HEADINGS } from "../components/sections/sectionHeadings";
import { OverviewSection } from "../components/sections/OverviewSection";
import { PriceExtremesSection } from "../components/sections/PriceExtremesSection";

const { overview } = PAGE_LABELS;

export const OverviewPage = () => {
  return (
    <MainContentWrapper title={overview} {...SECTION_HEADINGS.overview}>
      <PriceExtremesSection />
      <OverviewSection />
    </MainContentWrapper>
  );
};
