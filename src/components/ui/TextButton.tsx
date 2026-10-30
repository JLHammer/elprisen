import styled from "styled-components";

// Uppercase text button in the primary color, extend it with styled(TextButton) for layout
export const TextButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  transition: ${({ theme }) => theme.transitions.hover("color")};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
