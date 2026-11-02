import { formatKroner, formatSpokenKroner } from "../../utils/format";
import { VisuallyHidden } from "./VisuallyHidden";

type KronerProps = {
  price: number;
};

// Shows the design's "0.123 kr", but gives screen readers the Danish "0,123 kr"
export const Kroner = ({ price }: KronerProps) => (
  <>
    <span aria-hidden="true">{formatKroner(price)}</span>
    <VisuallyHidden>{formatSpokenKroner(price)}</VisuallyHidden>
  </>
);
