import styled from "styled-components";

type ToggleProps = {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const TrackStyled = styled.button<{ $checked: boolean }>`
  position: relative;
  width: 3.9rem;
  height: 1.8rem;
  flex-shrink: 0;
  border: 1px dashed
    ${({ theme, $checked }) => ($checked ? theme.colors.primary : "transparent")};
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.backgroundDark};
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const Knob = styled.span<{ $checked: boolean }>`
  position: absolute;
  top: 50%;
  // -1px puts it on the track's outer edge, past the border
  left: -1px;
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  translate: ${({ $checked }) => ($checked ? "2.05rem" : "0")} -50%;
  transition: translate 0.2s;
`;

export const Toggle = ({ id, checked, onChange }: ToggleProps) => (
  <TrackStyled
    id={id}
    type="button"
    role="switch"
    aria-checked={checked}
    $checked={checked}
    onClick={() => onChange(!checked)}
  >
    <Knob $checked={checked} />
  </TrackStyled>
);
