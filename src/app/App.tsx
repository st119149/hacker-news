import { View } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { DEFAULT_VIEW_PANELS } from "../shared/config/routes";
import { NewsList } from "../pages/news-list/ui/NewsList";
import { NewsDetails } from "../pages/news-details/ui";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.NEWS_LIST } =
    useActiveVkuiLocation();

  return (
    <View activePanel={activePanel}>
      <NewsList id="news-list" />
      <NewsDetails id="news-details" />
    </View>
  );
};
