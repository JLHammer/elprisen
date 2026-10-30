const priceFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
  useGrouping: false,
});

const timeFormatter = new Intl.DateTimeFormat("da-DK", {
  hour: "2-digit",
  minute: "2-digit",
});

export const formatPrice = (price: number) => priceFormatter.format(price);

// Converts a price to kroner text, e.g. "0.123 kr"
export const formatKroner = (price: number) => `${formatPrice(price)} kr`;

export const formatTime = (isoDate: string) => timeFormatter.format(new Date(isoDate));

export const formatDate = (date: string) => date.split("-").reverse().join("-");
