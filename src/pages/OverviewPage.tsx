import { MainContentWrapper } from "../components/layout/MainContentWrapper";
import { PAGE_LABELS } from "../router/routes";
import { OverviewSection } from "../components/sections/OverviewSection";
import { PriceExtremesSection } from "../components/sections/PriceExtremesSection";
import { PriceColorTooltip } from "../components/ui/PriceColorTooltip";

const { overview } = PAGE_LABELS;

export const OverviewPage = () => {
  return (
    <MainContentWrapper
      title={overview}
      heading={overview}
      headingSpacing="2.1rem"
      headingExtra={<PriceColorTooltip />}
    >
      <PriceExtremesSection />
      <OverviewSection />
    </MainContentWrapper>
  );
};
