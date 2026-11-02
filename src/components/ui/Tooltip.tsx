import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import styled from "styled-components";

import { card } from "../../styles/card";
import { Icon } from "./Icon";
import { IconButton } from "./IconButton";

type TooltipAnchor = "trigger" | "container";

type TooltipProps = {
  label: string;
  anchor?: TooltipAnchor;
  children: ReactNode;
};

const Bubble = styled.div<{ $open: boolean }>`
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
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: ${({ theme }) => theme.transitions.hover("opacity", "visibility")};
`;

const TooltipStyled = styled.span<{ $anchor: TooltipAnchor }>`
  position: ${({ $anchor }) => ($anchor === "trigger" ? "relative" : "static")};
  display: inline-flex;
`;

// The padding grows the 20px icon to WCAG's 24px target size, the negative margin keeps the layout as designed
const Trigger = styled(IconButton)`
  padding: 0.15rem;
  margin: -0.15rem;
  border-radius: 50%;
  cursor: help;
`;

/*
  A toggletip: the button opens it, and a mouse hovering it shows it too.
  Escape, clicking outside and tabbing away close it
*/
export const Tooltip = ({
  label,
  anchor = "trigger",
  children,
}: TooltipProps) => {
  const bubbleId = useId();
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const open = pinned || hovered;

  const close = () => {
    setPinned(false);
    setHovered(false);
  };

  // iOS Safari doesn't focus a tapped button, so a tap outside never blurs it
  useEffect(() => {
    if (!pinned) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (!tooltipRef.current?.contains(e.target as Node)) setPinned(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [pinned]);

  return (
    <TooltipStyled
      ref={tooltipRef}
      $anchor={anchor}
      // Only a real mouse, as touch fakes a hover that would keep it open after a second tap
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onKeyDown={(e) => e.key === "Escape" && close()}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && close()}
    >
      <Trigger
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={bubbleId}
        onClick={() => setPinned(!pinned)}
      >
        <Icon icon={faQuestionCircle} size="1.25rem" />
      </Trigger>
      {/* Focusable by clicking, so selecting its text doesn't count as leaving it */}
      <Bubble id={bubbleId} tabIndex={-1} $open={open}>
        {children}
      </Bubble>
    </TooltipStyled>
  );
};
