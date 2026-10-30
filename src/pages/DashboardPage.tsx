import { MainContentWrapper } from "../components/layout/MainContentWrapper";
import { SECTION_HEADINGS } from "../components/sections/sectionHeadings";
import { RightNowSection } from "../components/sections/RightNowSection";
import { PriceExtremesSection } from "../components/sections/PriceExtremesSection";
import { OverviewSection } from "../components/sections/OverviewSection";
import { HistorySection } from "../components/sections/HistorySection";
import { PriceInfo } from "../components/partials/PriceInfo";

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
