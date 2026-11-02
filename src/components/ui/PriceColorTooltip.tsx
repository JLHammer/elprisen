import styled from "styled-components";

import { priceColors } from "../../styles/theme";
import { Tooltip } from "./Tooltip";

const Text = styled.p`
  margin-bottom: 0.5rem;
`;

const Scale = styled.div`
  display: flex;
  gap: 0.1rem;
  margin-top: 0.25rem;
`;

const Swatch = styled.span<{ $color: string }>`
  flex: 1;
  height: 0.5rem;
  border-radius: 0.1rem;
  background-color: ${({ $color }) => $color};
`;

const ScaleLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.25rem;
  font-size: 0.75rem;
`;

export const PriceColorTooltip = () => (
  <Tooltip label="Hvad betyder farverne?" anchor="container">
    <Text>
      Farven viser, hvor billig prisen er i forhold til resten af samme døgn.
      Grøn er døgnets billigste priser, orange og rød de dyreste.
    </Text>
    <Text>
      Døgnets priser deles ligeligt mellem farverne, så én høj pris ikke får
      resten til at se billige ud. I morgen farves ud fra morgendagens egne
      priser.
    </Text>
    <Text>
      Morgendagens priser kommer hver dag omkring kl. 13 og dukker op her af sig
      selv. Indtil da slutter oversigten ved midnat.
    </Text>
    <Scale aria-hidden="true">
      {priceColors.map((color) => (
        <Swatch key={color} $color={color} />
      ))}
    </Scale>
    <ScaleLabels aria-hidden="true">
      <span>Billigst</span>
      <span>Dyrest</span>
    </ScaleLabels>
  </Tooltip>
);
