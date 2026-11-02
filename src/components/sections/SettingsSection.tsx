import { useId } from "react";
import styled from "styled-components";

import { useSettings } from "../../hooks/useSettings";
import type { PriceArea } from "../../types/api";
import { PRICE_AREAS } from "../../utils/priceArea";
import { Dropdown } from "../ui/Dropdown";
import { Toggle } from "../ui/Toggle";

const AREA_OPTIONS = (Object.keys(PRICE_AREAS) as PriceArea[]).map((area) => ({
  value: area,
  label: PRICE_AREAS[area].region,
}));

const SettingsStyled = styled.div`
  width: 85%;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  justify-items: start;
  row-gap: 2rem;
  column-gap: 1rem;
  text-align: left;
`;

const Label = styled.label`
  font-size: 0.8rem;
  text-transform: uppercase;
  cursor: pointer;
`;

const Control = styled.div`
  justify-self: end;
  display: flex;
`;

export const SettingsSection = () => {
  const vatId = useId();
  const notificationsId = useId();
  const areaId = useId();
  const areaLabelId = useId();
  const {
    settings: { includeVat, notifications, area },
    updateSettings,
  } = useSettings();

  return (
    <SettingsStyled>
      <Label htmlFor={vatId}>Priser inkl. moms</Label>
      <Control>
        <Toggle
          id={vatId}
          checked={includeVat}
          onChange={(checked) => updateSettings({ includeVat: checked })}
        />
      </Control>

      <Label htmlFor={notificationsId}>Laveste pris alarm</Label>
      <Control>
        <Toggle
          id={notificationsId}
          checked={notifications}
          onChange={(checked) => updateSettings({ notifications: checked })}
        />
      </Control>

      <Label id={areaLabelId} htmlFor={areaId}>
        Vælg region
      </Label>
      <Control>
        <Dropdown
          id={areaId}
          labelId={areaLabelId}
          placeholder="Vælg region"
          options={AREA_OPTIONS}
          value={area}
          onChange={(value) => updateSettings({ area: value })}
        />
      </Control>
    </SettingsStyled>
  );
};
