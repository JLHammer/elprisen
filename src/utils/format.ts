const priceFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
  useGrouping: false,
});

/*
  da-DK is what yields the "." time separator used in Denmark, giving "HH.MM",
  and the API's prices are hourly, so MM is always "00"
*/
const timeFormatter = new Intl.DateTimeFormat("da-DK", {
  hour: "2-digit",
  minute: "2-digit",
});

// Converts a price from number to string with 3 decimal places and a "." separator, e.g. "0.123"
const formatPrice = (price: number) => priceFormatter.format(price);

// Converts a price to kroner text, e.g. "0.123 kr"
export const formatKroner = (price: number) => `${formatPrice(price)} kr`;

// Converts from ISO date string to "HH.MM" format
export const formatTime = (isoDate: string) =>
  timeFormatter.format(new Date(isoDate));

// Converts from "YYYY-MM-DD" to "DD-MM-YYYY" format
export const formatDate = (date: string) => date.split("-").reverse().join("-");
