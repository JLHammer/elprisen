import { MainContentWrapper } from "../components/layout/MainContentWrapper";
import { PriceInfo } from "../components/partials/PriceInfo";
import { HistorySection } from "../components/sections/HistorySection";
import { OverviewSection } from "../components/sections/OverviewSection";
import { PriceExtremesSection } from "../components/sections/PriceExtremesSection";
import { RightNowSection } from "../components/sections/RightNowSection";
import { SECTION_HEADINGS } from "../components/sections/sectionHeadings";

const { rightNow, overview, history } = SECTION_HEADINGS;

// Desktop puts the lowest and highest price and the footer's price info under the current price
export const DashboardPage = () => {
  return (
    <>
      <MainContentWrapper {...rightNow}>
        <RightNowSection />
        <PriceExtremesSection />
        <PriceInfo />
      </MainContentWrapper>
      <MainContentWrapper {...overview}>
        <OverviewSection />
      </MainContentWrapper>
      <MainContentWrapper {...history}>
        <HistorySection />
      </MainContentWrapper>
    </>
  );
};
