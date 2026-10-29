export const colors = {
  background: "#27282B",
  backgroundDark: "#201E1E",
  backgroundRightNow: "#1E1E1E",
  primary: "#55EC20",
  text: "#EBEBEB",
} as const;

export const priceColors = [
  "#00FF29",
  "#33FF00",
  "#B8FF22",
  "#EDFF23",
  "#FFD645",
  "#FF7A00",
  "#FF8717",
  "#FF4D00",
] as const;

export const boxShadows = {
  outer: (strength: number, width = "0.5rem") =>
    `0 0 ${width} color-mix(in srgb, ${colors.text} ${strength}%, transparent)`,
} as const;

export const borderGradients = {
  inner: (strength: number, width = "0.5rem") =>
    `radial-gradient(
      closest-side,
      ${colors.backgroundDark} calc(100% - ${width}),
      color-mix(in srgb, ${colors.text} ${strength}%, ${colors.backgroundDark})
    )`,
} as const;

export const fonts = {
  roboto: '"Roboto", sans-serif',
} as const;

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
} as const;

const breakpoints = {
  tablet: 768,
  desktop: 1024,
} as const;

export const mediaQueries = {
  tablet: `(min-width: ${breakpoints.tablet}px)`,
  desktop: `(min-width: ${breakpoints.desktop}px)`,
} as const;

export const theme = {
  colors,
  priceColors,
  boxShadows,
  borderGradients,
  fonts,
  fontWeights,
  mediaQueries,
} as const;

export type Theme = typeof theme;
