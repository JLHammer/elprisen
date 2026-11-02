import type { ReactNode } from "react";
import styled from "styled-components";
import { TextButton } from "./TextButton";
import { card } from "../../styles/card";

type ToastProps = {
  children: ReactNode;
  onClose: () => void;
};

/*
  Fixed at the bottom so several toasts stack upwards instead of overlapping.
  It is the live region rather than each toast, because screen readers only reliably
  announce content added to a region that was already on the page
*/
export const ToastStack = styled.div.attrs({ role: "status" })`
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

export const Toast = ({ children, onClose }: ToastProps) => (
  <ToastStyled>
    <p>{children}</p>
    <CloseButton type="button" onClick={onClose}>
      Luk
    </CloseButton>
  </ToastStyled>
);
