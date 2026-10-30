import styled from "styled-components";
import { formatKroner } from "../../utils/format";
import type { Theme } from "../../styles/theme";

type PriceCircleVariant = "large" | "small";

type PriceCircleProps = {
  variant: PriceCircleVariant;
  price: number;
};

type Ring = {
  inset: string;
  dashes: number;
  opacity?: number;
};

type VariantStyle = {
  width: string;
  background: keyof Theme["colors"];
  glow: number;
  shadow: boolean;
  rings: Ring[];
  amountSize: string;
  unitSize: string;
  highlight: boolean;
};

const VARIANTS: Record<PriceCircleVariant, VariantStyle> = {
  large: {
    width: "17.25rem",
    background: "backgroundRightNow",
    glow: 15,
    shadow: false,
    rings: [
      { inset: "1rem", dashes: 96, opacity: 0.65 },
      { inset: "1.9rem", dashes: 85 },
    ],
    amountSize: "2rem",
    unitSize: "1.1rem",
    highlight: true,
  },
  small: {
    width: "8.5rem",
    background: "backgroundDark",
    glow: 4,
    shadow: true,
    rings: [{ inset: "0.5rem", dashes: 47 }],
    amountSize: "1.1rem",
    unitSize: "0.7rem",
    highlight: false,
  },
};

type PriceCircleStyledProps = {
  $width: string;
  $background: keyof Theme["colors"];
  $glow: number;
  $shadow: boolean;
};

const PriceCircleStyled = styled.div<PriceCircleStyledProps>`
  width: ${({ $width }) => $width};
  max-width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  background: ${({ theme, $glow, $background }) =>
    theme.borderGradients.inner($glow, theme.colors[$background])};
  box-shadow: ${({ theme, $shadow }) =>
    $shadow ? `0 0 0.25rem ${theme.colors.backgroundDark}` : "none"};
`;

type DashedRingProps = {
  $inset: string;
  $dashes: number;
  $opacity: number;
};

const DashedRing = styled.span<DashedRingProps>`
  position: absolute;
  inset: ${({ $inset }) => $inset};
  border-radius: 50%;
  background: repeating-conic-gradient(
    ${({ theme }) => theme.colors.primary} 0 calc(180deg / ${({ $dashes }) => $dashes}),
    transparent 0 calc(360deg / ${({ $dashes }) => $dashes})
  );
  mask: radial-gradient(
    closest-side,
    transparent calc(100% - 1px),
    ${({ theme }) => theme.colors.primary} calc(100% - 1px)
  );
  opacity: ${({ $opacity }) => $opacity};
  pointer-events: none;
`;

const Price = styled.p<{ $highlight: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  line-height: 1;
  text-transform: uppercase;
  color: ${({ theme, $highlight }) => ($highlight ? theme.colors.primary : "inherit")};
  font-weight: ${({ theme, $highlight }) => ($highlight ? theme.fontWeights.bold : "inherit")};
`;

const Amount = styled.span<{ $size: string }>`
  font-size: ${({ $size }) => $size};
`;

const Unit = styled.span<{ $size: string }>`
  font-size: ${({ $size }) => $size};
`;

export const PriceCircle = ({ variant, price }: PriceCircleProps) => {
  const { width, background, glow, shadow, rings, amountSize, unitSize, highlight } =
    VARIANTS[variant];

  return (
    <PriceCircleStyled $width={width} $background={background} $glow={glow} $shadow={shadow}>
      {rings.map(({ inset, dashes, opacity = 1 }) => (
        <DashedRing key={inset} $inset={inset} $dashes={dashes} $opacity={opacity} />
      ))}
      <Price $highlight={highlight}>
        {/* The price per kWh, e.g. "0.123 kr" */}
        <Amount $size={amountSize}>{formatKroner(price)}</Amount>
        <Unit $size={unitSize}>pr. kWh</Unit>
      </Price>
    </PriceCircleStyled>
  );
};
