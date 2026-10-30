import { css } from "styled-components";

// Dark raised surface shared by toasts, tooltips, price rows and the date picker
export const card = css`
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.colors.backgroundDark};
  box-shadow: ${({ theme }) => theme.boxShadows.outer(10)};
`;
