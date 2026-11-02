import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import { Icon } from "./Icon";

export type ExpandDirection = "up" | "down";

type ExpandIconProps = {
  expanded: boolean;
  // The way the content opens, the chevron points that way until it is open and then flips
  opens: ExpandDirection;
};

export const ExpandIcon = ({ expanded, opens }: ExpandIconProps) => {
  const pointsUp = expanded ? opens === "down" : opens === "up";

  return <Icon icon={pointsUp ? faChevronUp : faChevronDown} />;
};
