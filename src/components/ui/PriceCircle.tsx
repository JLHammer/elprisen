import type { ReactNode } from "react";
import styled from "styled-components";

type PriceCircleVariant = "large" | "small";

type PriceCircleProps = {
  variant: PriceCircleVariant;
  children: ReactNode;
};

type Ring = {
  inset: string;
  dashes: number;
  opacity?: number;
};

type VariantStyle = {
  width: string;
  glow: number;
  shadow: boolean;
  rings: Ring[];
};

const VARIANTS: Record<PriceCircleVariant, VariantStyle> = {
  large: {
    width: "17.25rem",
    glow: 15,
    shadow: false,
    rings: [
      { inset: "1rem", dashes: 96, opacity: 0.65 },
      { inset: "1.9rem", dashes: 85 },
    ],
  },
  small: {
    width: "8.5rem",
    glow: 4,
    shadow: true,
    rings: [{ inset: "0.5rem", dashes: 47 }],
  },
};

type PriceCircleStyledProps = {
  $width: string;
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
  background: ${({ theme, $glow }) => theme.borderGradients.inner($glow)};
  box-shadow: ${({ theme, $shadow }) =>
    $shadow ? `0 0 0.25rem ${theme.colors.backgroundDark}` : "none"};
`;

type RingStyledProps = {
  $inset: string;
  $dashes: number;
  $opacity: number;
};

const RingStyled = styled.span<RingStyledProps>`
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

export const PriceCircle = ({ variant, children }: PriceCircleProps) => {
  const { width, glow, shadow, rings } = VARIANTS[variant];

  return (
    <PriceCircleStyled $width={width} $glow={glow} $shadow={shadow}>
      {rings.map(({ inset, dashes, opacity = 1 }) => (
        <RingStyled key={inset} $inset={inset} $dashes={dashes} $opacity={opacity} />
      ))}
      {children}
    </PriceCircleStyled>
  );
};
