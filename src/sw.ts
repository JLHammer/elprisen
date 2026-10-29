/// <reference lib="webworker" />
import { clientsClaim } from "workbox-core";
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
import type { WorkboxPlugin } from "workbox-core/types";

declare let self: ServiceWorkerGlobalScope;

const validPricesPlugin: WorkboxPlugin = {
  cacheWillUpdate: async ({ response }) => {
    const data: unknown = await response.clone().json().catch(() => null);
    return Array.isArray(data) && data.length > 0 ? response : null;
  },
};

self.skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();

let allowlist: RegExp[] | undefined;
if (import.meta.env.DEV) allowlist = [/^\/$/];

registerRoute(new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist }));

registerRoute(
  /^https:\/\/www\.elprisenligenu\.dk\/api\/v1\/prices\//,
  new CacheFirst({
    cacheName: "electricity-prices",
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      validPricesPlugin,
      new ExpirationPlugin({ maxEntries: 30, purgeOnQuotaError: true }),
    ],
  }),
);
