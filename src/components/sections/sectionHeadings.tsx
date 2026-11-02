import { PAGE_LABELS } from "../../router/routes";
import type { MainContentWrapperProps } from "../layout/MainContentWrapper";
import { PriceColorTooltip } from "../ui/PriceColorTooltip";

type SectionHeading = Pick<
  MainContentWrapperProps,
  "heading" | "headingSpacing" | "headingExtra"
>;

// Shared by each section's own page and the desktop dashboard, so the two stay alike
export const SECTION_HEADINGS = {
  rightNow: {
    heading: "Elprisen lige nu",
    headingSpacing: "4rem",
  },
  overview: {
    heading: PAGE_LABELS.overview,
    headingSpacing: "2rem",
    headingExtra: <PriceColorTooltip />,
  },
  history: {
    heading: PAGE_LABELS.history,
    headingSpacing: "3.75rem",
  },
} satisfies Partial<Record<keyof typeof PAGE_LABELS, SectionHeading>>;
