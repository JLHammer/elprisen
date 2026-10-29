const danishTimeFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Copenhagen",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hourCycle: "h23",
});

export const getDanishTime = (date: Date) => {
  const parts = Object.fromEntries(
    danishTimeFormat.formatToParts(date).map(({ type, value }) => [type, Number(value)]),
  );
  return { year: parts.year, month: parts.month, day: parts.day, minutes: parts.hour * 60 + parts.minute };
};

export const getDanishDate = (dayOffset = 0, date = new Date()) => {
  const { year, month, day } = getDanishTime(date);
  return new Date(Date.UTC(year, month - 1, day + dayOffset)).toISOString().slice(0, 10);
};
