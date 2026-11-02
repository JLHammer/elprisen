import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

import { card } from "../../styles/card";
import { formatDate } from "../../utils/format";
import { Icon } from "./Icon";

type DatePickerProps = {
  label: string;
  value: string;
  min?: string;
  max?: string;
  onChange: (value: string) => void;
  className?: string;
};

const DatePickerStyled = styled.label`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.8rem;
  ${card}
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.hover("color", "box-shadow")};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    box-shadow: ${({ theme }) => theme.boxShadows.outer(20)};
  }

  /* The date input inside is invisible, so the label shows its focus instead */
  &:focus-within {
    color: ${({ theme }) => theme.colors.text};
    outline: ${({ theme }) => theme.focusRing.outline};
    outline-offset: ${({ theme }) => theme.focusRing.offset};
  }
`;

const DateText = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

const DateInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

export const DatePicker = ({
  label,
  value,
  min,
  max,
  onChange,
  className,
}: DatePickerProps) => (
  <DatePickerStyled className={className}>
    {/* Shows the selected date as "DD-MM-YYYY" */}
    <DateText>{formatDate(value)}</DateText>
    <Icon icon={faCalendarAlt} size="1.4rem" />
    {/* The label starts with the visible date, so voice control users can say what they see */}
    <DateInput
      type="date"
      aria-label={`${formatDate(value)}, ${label}`}
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.currentTarget.showPicker?.()}
    />
  </DatePickerStyled>
);
