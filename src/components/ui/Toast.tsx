import type { ReactNode } from "react";
import styled from "styled-components";

// Fixed at the bottom so several toasts stack upwards instead of overlapping
export const ToastStack = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 50%;
  translate: -50% 0;
  z-index: 10;
  width: min(22rem, calc(100% - 2rem));
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  pointer-events: none;
`;

const ToastStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.colors.backgroundDark};
  box-shadow: ${({ theme }) => theme.boxShadows.outer(10)};
  font-size: 0.9rem;
  pointer-events: auto;
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const Toast = ({ children, onClose }: { children: ReactNode; onClose: () => void }) => (
  <ToastStyled role="status">
    <p>{children}</p>
    <CloseButton type="button" onClick={onClose}>
      Luk
    </CloseButton>
  </ToastStyled>
);
