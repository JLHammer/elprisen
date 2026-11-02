import { mediaQueries } from "../styles/theme";
import { useMediaQuery } from "./useMediaQuery";

// Whether the viewport is at least as wide as the tablet or desktop breakpoint
export const useIsTabletUp = () => useMediaQuery(mediaQueries.tablet);
export const useIsDesktop = () => useMediaQuery(mediaQueries.desktop);
