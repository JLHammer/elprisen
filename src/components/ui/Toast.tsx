import type { ReactNode } from "react";
import styled from "styled-components";
import { TextButton } from "./TextButton";
import { card } from "../../styles/card";

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
  ${card}
  font-size: 0.9rem;
  pointer-events: auto;
`;

const CloseButton = styled(TextButton)`
  flex-shrink: 0;
`;

export const Toast = ({ children, onClose }: { children: ReactNode; onClose: () => void }) => (
  <ToastStyled role="status">
    <p>{children}</p>
    <CloseButton type="button" onClick={onClose}>
      Luk
    </CloseButton>
  </ToastStyled>
);
