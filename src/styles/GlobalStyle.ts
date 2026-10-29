import { createGlobalStyle, css } from "styled-components";
import { preflight } from "./preflight";

const globalStyles = css`
  /* Layered so component styles always win over the reset, whatever their specificity */
  @layer base {
    ${preflight}
  }

  body {
    font-family: ${({ theme }) => theme.fonts.roboto};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  section {
    width: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: ${({ theme }) => theme.fontWeights.light};
  }

  h1 {
    font-size: 1.75rem;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${globalStyles}
`;
