import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useId, useRef, type ReactNode } from "react";
import styled from "styled-components";

import { Icon } from "./Icon";
import { IconButton } from "./IconButton";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

// No display rule here, so the browser's own dialog:not([open]) { display: none } keeps working
const ModalStyled = styled.dialog`
  width: min(45rem, calc(100% - 2rem));
  margin: auto;
  padding: 0;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.boxShadows.outer(10)};

  &::backdrop {
    background-color: color-mix(
      in srgb,
      ${({ theme }) => theme.colors.backgroundDark} 70%,
      transparent
    );
  }
`;

// Fills the whole dialog, so a click that lands on the dialog itself came from the backdrop
const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 33rem;
  padding: 4rem 2rem;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  border-radius: 50%;
`;

const Heading = styled.h2`
  margin-bottom: 5rem;
  font-size: 1.75rem;
  text-transform: uppercase;
`;

const Body = styled.div`
  width: min(100%, 17.5rem);
  display: flex;
  justify-content: center;
`;

export const Modal = ({ open, title, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingId = useId();

  // showModal() is what adds the backdrop, keeps focus inside and closes on Escape
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <ModalStyled
      ref={dialogRef}
      aria-labelledby={headingId}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <Content>
        <CloseButton type="button" aria-label="Luk" onClick={onClose}>
          <Icon icon={faTimesCircle} size="1.75rem" />
        </CloseButton>
        <Heading id={headingId}>{title}</Heading>
        <Body>{children}</Body>
      </Content>
    </ModalStyled>
  );
};
