import type { MainContentWrapperProps } from "../layout/MainContentWrapper";
import { PriceColorTooltip } from "../ui/PriceColorTooltip";
import { PAGE_LABELS } from "../../router/routes";

type SectionHeading = Pick<MainContentWrapperProps, "heading" | "headingSpacing" | "headingExtra">;

// Shared by each section's own page and the desktop dashboard, so the two stay alike
export const SECTION_HEADINGS = {
  rightNow: {
    heading: "Elprisen lige nu",
    headingSpacing: "4.1rem",
  },
  overview: {
    heading: PAGE_LABELS.overview,
    headingSpacing: "2.1rem",
    headingExtra: <PriceColorTooltip />,
  },
  history: {
    heading: PAGE_LABELS.history,
    headingSpacing: "3.75rem",
  },
} satisfies Partial<Record<keyof typeof PAGE_LABELS, SectionHeading>>;
