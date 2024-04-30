import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from "@vkontakte/vk-mini-apps-router";

export const DEFAULT_ROOT = "default_root";

export const DEFAULT_VIEW = "default_view";

export const DEFAULT_VIEW_PANELS = {
  NEWS_LIST: "news-list",
  NEWS_DETAILS: "news-details",
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.NEWS_LIST, "/", []),
      createPanel(DEFAULT_VIEW_PANELS.NEWS_DETAILS, `/:newsId`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
