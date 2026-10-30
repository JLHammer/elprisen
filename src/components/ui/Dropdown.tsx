import { useId, useState, type KeyboardEvent } from "react";
import styled from "styled-components";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "./Icon";

type DropdownOption<T extends string> = {
  value: T;
  label: string;
};

type DropdownProps<T extends string> = {
  id?: string;
  placeholder: string;
  options: DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

const DropdownStyled = styled.div`
  position: relative;
  font-size: 0.7rem;
  text-transform: uppercase;
`;

const Trigger = styled.button<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.6rem;
  border-radius: ${({ $open }) => ($open ? "0.25rem 0.25rem 0 0" : "0.25rem")};
  background-color: ${({ theme }) => theme.colors.backgroundDark};
  color: ${({ theme }) => theme.colors.text};
  text-transform: inherit;
  cursor: pointer;

  &:focus-visible {
    outline: 1px dashed ${({ theme }) => theme.colors.text};
    outline-offset: 2px;
  }
`;

const ChevronStyled = styled.span`
  display: flex;
  color: ${({ theme }) => theme.colors.primary};
`;

const OptionList = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;
  width: 100%;
  padding-bottom: 0.25rem;
  border-radius: 0 0 0.25rem 0.25rem;
  background-color: ${({ theme }) => theme.colors.backgroundDark};
  list-style: none;
`;

const Option = styled.li<{ $selected: boolean; $active: boolean }>`
  padding: 0.6rem;
  text-align: center;
  color: ${({ theme, $selected }) => ($selected ? theme.colors.primary : theme.colors.text)};
  background-color: ${({ theme, $active }) =>
    $active ? `color-mix(in srgb, ${theme.colors.text} 10%, transparent)` : "transparent"};
  cursor: pointer;
`;

export const Dropdown = <T extends string>({
  id,
  placeholder,
  options,
  value,
  onChange,
}: DropdownProps<T>) => {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedIndex = options.findIndex((option) => option.value === value);

  const openList = () => {
    setActiveIndex(Math.max(selectedIndex, 0));
    setOpen(true);
  };

  const select = (index: number) => {
    onChange(options[index].value);
    setOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        select(activeIndex);
        break;
      case "Escape":
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <DropdownStyled onBlur={() => setOpen(false)}>
      <Trigger
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${activeIndex}` : undefined}
        $open={open}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
      >
        {placeholder}
        <ChevronStyled>
          <Icon icon={open ? faChevronUp : faChevronDown} />
        </ChevronStyled>
      </Trigger>
      <OptionList id={listId} role="listbox" hidden={!open}>
        {options.map((option, index) => (
          <Option
            key={option.value}
            id={`${listId}-${index}`}
            role="option"
            aria-selected={index === selectedIndex}
            $selected={index === selectedIndex}
            $active={index === activeIndex}
            onMouseDown={(e) => e.preventDefault()}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => select(index)}
          >
            {option.label}
          </Option>
        ))}
      </OptionList>
    </DropdownStyled>
  );
};
