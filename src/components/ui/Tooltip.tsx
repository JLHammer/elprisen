import { useId, type ReactNode } from "react";
import styled from "styled-components";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { Icon } from "./Icon";
import { IconButton } from "./IconButton";
import { card } from "../../styles/card";

type TooltipAnchor = "trigger" | "container";

type TooltipProps = {
  label: string;
  anchor?: TooltipAnchor;
  children: ReactNode;
};

const Bubble = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  translate: -50% 0;
  z-index: 1;
  width: min(16rem, calc(100vw - 2rem));
  padding: 0.75rem;
  ${card}
  font-size: 0.9rem;
  line-height: 1.4;
  text-align: left;
  visibility: hidden;
  opacity: 0;
  transition: ${({ theme }) => theme.transitions.hover("opacity", "visibility")};
`;

const TooltipStyled = styled.span<{ $anchor: TooltipAnchor }>`
  position: ${({ $anchor }) => ($anchor === "trigger" ? "relative" : "static")};
  display: inline-flex;

  &:hover ${Bubble}, &:focus-within ${Bubble} {
    visibility: visible;
    opacity: 1;
  }
`;

const Trigger = styled(IconButton)`
  cursor: help;
`;

export const Tooltip = ({ label, anchor = "trigger", children }: TooltipProps) => {
  const bubbleId = useId();

  return (
    <TooltipStyled $anchor={anchor}>
      <Trigger type="button" aria-label={label} aria-describedby={bubbleId}>
        <Icon icon={faQuestionCircle} size="1.25rem" />
      </Trigger>
      <Bubble id={bubbleId} role="tooltip">
        {children}
      </Bubble>
    </TooltipStyled>
  );
};
