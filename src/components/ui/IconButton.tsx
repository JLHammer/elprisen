import styled from "styled-components";

// Icon-only button in the primary color, extend it with styled(IconButton) for layout
export const IconButton = styled.button`
  display: flex;
  color: ${({ theme }) => theme.colors.primary};
  transition: ${({ theme }) => theme.transitions.hover("color")};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
