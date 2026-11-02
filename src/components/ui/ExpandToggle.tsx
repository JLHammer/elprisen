import styled from "styled-components";

import { ExpandIcon, type ExpandDirection } from "./ExpandIcon";
import { TextButton } from "./TextButton";

type ExpandToggleProps = {
  expanded: boolean;
  // Id of the element it shows and hides
  controls: string;
  opens: ExpandDirection;
  showLabel: string;
  hideLabel: string;
  onToggle: () => void;
};

const ExpandToggleStyled = styled(TextButton)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

export const ExpandToggle = ({
  expanded,
  controls,
  opens,
  showLabel,
  hideLabel,
  onToggle,
}: ExpandToggleProps) => (
  <ExpandToggleStyled
    type="button"
    aria-expanded={expanded}
    aria-controls={controls}
    onClick={onToggle}
  >
    <ExpandIcon expanded={expanded} opens={opens} />
    {expanded ? hideLabel : showLabel}
  </ExpandToggleStyled>
);
