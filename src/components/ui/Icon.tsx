import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type IconProps = {
  icon: IconDefinition;
  size?: string;
};

type IconStyledProps = {
  $size?: string;
};

const IconStyled = styled(FontAwesomeIcon)<IconStyledProps>`
  font-size: ${({ $size }) => $size ?? "1em"};
`;

export const Icon = ({ icon, size }: IconProps) => {
  return <IconStyled icon={icon} $size={size} />;
};
