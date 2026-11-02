# Elprisen

A PWA that shows Danish electricity prices hour by hour: the price right now, an overview of the upcoming hours, and a history of any day since 27-10-2022. Prices can be shown with or without VAT, for either price area (Øst/Vest Danmark).

Prices come from the public [elprisenligenu.dk](https://www.elprisenligenu.dk) API.

## Stack

React, TypeScript, Vite, styled-components, React Router and vite-plugin-pwa (Workbox service worker for offline use).

## Scripts

| Command                       | Description                                                     |
| ----------------------------- | --------------------------------------------------------------- |
| `npm run dev`                 | Start the dev server                                            |
| `npm run build`               | Type-check and build for production                             |
| `npm run preview`             | Preview the production build                                    |
| `npm run lint`                | Run ESLint                                                      |
| `npm run format`              | Format all files with Prettier                                  |
| `npm run format:check`        | Check that all files are formatted                              |
| `npm run generate-pwa-assets` | Regenerate the maskable and iOS icons from `public/favicon.svg` |
