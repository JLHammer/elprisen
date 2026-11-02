import { MainContentWrapper } from "../components/layout/MainContentWrapper";
import { OverviewSection } from "../components/sections/OverviewSection";
import { PriceExtremesSection } from "../components/sections/PriceExtremesSection";
import { SECTION_HEADINGS } from "../components/sections/sectionHeadings";
import { PAGE_LABELS } from "../router/routes";

const { overview } = PAGE_LABELS;

export const OverviewPage = () => (
  <MainContentWrapper title={overview} {...SECTION_HEADINGS.overview}>
    <PriceExtremesSection />
    <OverviewSection />
  </MainContentWrapper>
);
