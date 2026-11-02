import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

type IconProps = {
  icon: IconDefinition;
  size?: string;
};

const IconStyled = styled(FontAwesomeIcon)<{ $size?: string }>`
  font-size: ${({ $size }) => $size ?? "1em"};
`;

export const Icon = ({ icon, size }: IconProps) => {
  return <IconStyled icon={icon} $size={size} />;
};
