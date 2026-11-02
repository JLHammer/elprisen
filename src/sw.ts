/// <reference lib="webworker" />
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { clientsClaim } from "workbox-core";
import type { WorkboxPlugin } from "workbox-core/types";
import { ExpirationPlugin } from "workbox-expiration";
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";

declare let self: ServiceWorkerGlobalScope;

const validPricesPlugin: WorkboxPlugin = {
  cacheWillUpdate: async ({ response }) => {
    const data: unknown = await response
      .clone()
      .json()
      .catch(() => null);
    return Array.isArray(data) && data.length > 0 ? response : null;
  },
};

void self.skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();

let allowlist: RegExp[] | undefined;
if (import.meta.env.DEV) allowlist = [/^\/$/];

registerRoute(
  new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist }),
);

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
