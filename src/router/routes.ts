export const ROUTES = {
  overview: "/oversigt",
  rightNow: "/lige-nu",
  history: "/historik",
  settings: "/indstillinger",
  notFound: "*",
} as const;

export const PAGE_LABELS = {
  overview: "Oversigt",
  rightNow: "Lige nu",
  history: "Historik",
  settings: "Indstillinger",
  notFound: "Siden blev ikke fundet",
} as const satisfies Record<keyof typeof ROUTES, string>;

const NAV_PAGES = ["overview", "rightNow", "history"] as const;

export const NAV_LINKS = NAV_PAGES.map((page) => ({
  path: ROUTES[page],
  label: PAGE_LABELS[page],
}));
