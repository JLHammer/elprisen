import { useId, useState, type KeyboardEvent } from "react";
import styled from "styled-components";

import { ExpandIcon } from "./ExpandIcon";

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
  text-transform: inherit;
`;

const Chevron = styled.span`
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
`;

const Option = styled.li<{ $selected: boolean; $active: boolean }>`
  padding: 0.6rem;
  text-align: center;
  color: ${({ theme, $selected }) => ($selected ? theme.colors.primary : theme.colors.text)};
  background-color: ${({ theme, $active }) =>
    $active
      ? `color-mix(in srgb, ${theme.colors.text} 10%, transparent)`
      : "transparent"};
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

  const openList = (index = Math.max(selectedIndex, 0)) => {
    setActiveIndex(index);
    setOpen(true);
  };

  const select = (index: number) => {
    onChange(options[index].value);
    setOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      openList(e.key === "Home" ? 0 : options.length - 1);
      return;
    }

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
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${activeIndex}` : undefined}
        $open={open}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
      >
        {/* The selected option is the combobox's value, which screen readers read with its label */}
        {options[selectedIndex]?.label ?? placeholder}
        <Chevron>
          <ExpandIcon expanded={open} opens="down" />
        </Chevron>
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
