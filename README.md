# Elprisen

A PWA that shows Danish electricity prices hour by hour: the price right now, an overview of the upcoming hours, and a history of any day since 27-10-2022. Prices can be shown with or without VAT, for either price area (Øst/Vest Danmark).

Prices come from the public [elprisenligenu.dk](https://www.elprisenligenu.dk) API.

## Stack

React, TypeScript, Vite, styled-components, React Router and vite-plugin-pwa (Workbox service worker for offline use).

## Scripts

| Command                       | Description                                                                      |
| ----------------------------- | -------------------------------------------------------------------------------- |
| `npm run dev`                 | Start the dev server                                                             |
| `npm run build`               | Type-check and build for production                                              |
| `npm run preview`             | Preview the production build                                                     |
| `npm run lint`                | Run ESLint                                                                       |
| `npm run format`              | Format all files with Prettier                                                   |
| `npm run format:check`        | Check that all files are formatted                                               |
| `npm run generate-pwa-assets` | Regenerate `favicon.ico` and the Android and iOS icons from `public/favicon.svg` |

## Architecture

### Folders

| Folder                     | Role                                                                                                                                                                                                                        |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/api/`                 | Fetching prices from the API, with the in-memory cache and the retry timing. No React                                                                                                                                       |
| `src/hooks/`               | React hooks, e.g. `useElectricityPrices` (one day's prices as state), `useUpcomingPrices` (today and tomorrow from now on), `useHistoryDate` (the date in `?dato=`), `useNow` (ticks every minute) and the breakpoint hooks |
| `src/context/`             | The settings (price area, VAT, lowest price alarm), saved in `localStorage`                                                                                                                                                 |
| `src/router/`              | The paths, page labels and nav links in `routes.ts`, and `AppRouter`, which picks the routes for the current breakpoint                                                                                                     |
| `src/pages/`               | One component per route. Each wraps one or more sections in `MainContentWrapper`                                                                                                                                            |
| `src/components/layout/`   | `MainLayout` (header, main, footer) and `MainContentWrapper` (a section with its heading and the tab title)                                                                                                                 |
| `src/components/sections/` | The content of each page, used by both the mobile pages and the desktop dashboard. `sectionHeadings.tsx` gives both the same headings                                                                                       |
| `src/components/partials/` | Pieces of this app's layout, used in one place: header, navbar, footer, price info, settings button and the toasts                                                                                                          |
| `src/components/ui/`       | Reusable building blocks, e.g. `Modal`, `Dropdown`, `Toggle`, `Toast`, `Tooltip`, `PriceCircle` and `PriceHourEntry`                                                                                                        |
| `src/styles/`              | The theme (colors, price colors, breakpoints and more), the global style, the CSS reset and the shared card style                                                                                                           |
| `src/utils/`               | Pure functions: Danish time, formatting, price levels, VAT and the `localStorage` wrappers                                                                                                                                  |
| `src/types/`               | The API's response type                                                                                                                                                                                                     |
| `src/sw.ts`                | The service worker                                                                                                                                                                                                          |

### Responsiveness

The breakpoints live in `src/styles/theme.ts`: tablet from 768px and desktop from 1024px. Besides the CSS media queries, `useIsTabletUp` and `useIsDesktop` read the same queries in JavaScript, because the routes and some components differ, not only the styling.

|                   | Mobile                                                                                | Tablet                                                                  | Desktop                                                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pages             | One per section: `/lige-nu`, `/oversigt` and `/historik`. `/` redirects to `/lige-nu` | Same as mobile                                                          | All three sections side by side on `/` (`DashboardPage`). The section paths redirect there and keep the query string, so links from mobile still work |
| Navigation        | Navbar in the header                                                                  | Same as mobile                                                          | None, everything is on one page                                                                                                                       |
| Settings          | A button on each page opens the `/indstillinger` page                                 | A button in the header opens a modal. `/indstillinger` redirects to `/` | Same as tablet                                                                                                                                        |
| VAT and area info | The footer                                                                            | Same as mobile                                                          | `PriceInfo` under the current price, and no footer                                                                                                    |
| Overview          | The next 8 hours, with buttons to show earlier and later hours                        | Same as mobile                                                          | All hours, earlier ones dimmed                                                                                                                        |

### Prices: caching and retries

The API has one JSON file per day and price area, e.g. `.../api/v1/prices/2026/10-28_DK1.json`. Dates and times are always worked out in Danish time (`src/utils/danishTime.ts`), whatever the device's time zone. Prices come without VAT, so VAT is added in the browser and switching it on or off doesn't fetch anything.

Days that can't have prices fail right away, without a request: days before 27-10-2022, and days after the last published one. That is today before 13:10 Danish time and tomorrow after it.

**In-memory cache** (`src/api/prices.ts`): there is one request per day and area, shared by every component that asks for it. The current price, the overview and the lowest price toast all use today's.

- A successful request is kept until the page reloads.
- A failed one is kept for 10 minutes, so components don't ask again straight away. If tomorrow's prices are still missing at 14:00, it waits an hour instead. Either way the wait ends at midnight at the latest.
- A failure while offline isn't kept, so the next attempt asks again right away.

**Retries** (`src/hooks/useElectricityPrices.ts`): after a failure the hook tries again on its own. It doesn't wait for a reload.

- Tomorrow's prices, before they are published, are tried at 13:10 Danish time. This also holds on the nights the clocks change.
- Other failures are tried when the in-memory wait ends.
- It also tries again when the device comes back online. When the tab becomes visible, it works out the next attempt again, because browsers delay timers in hidden tabs.

**Service worker** (`src/sw.ts`):

- The app shell is precached, so the app opens offline.
- API responses use cache first, in the `electricity-prices` cache. Only successful responses with at least one price are stored, and the 30 most recently used days are kept. Prices for a day don't change once published, so a stored day is never fetched again and works offline.
- A new version takes over right away. `OfflineReadyToast` registers the service worker and checks for updates every hour.
