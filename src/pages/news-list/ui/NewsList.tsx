import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import {
  Panel,
  PanelHeader,
  Button,
  Div,
  NavIdProps,
  ScreenSpinner,
  SplitLayout,
} from "@vkontakte/vkui";
import { News } from "../../../shared/types/newsTypes";
import { getNewsList } from "../api";
import { NEWS_UPDATE_INTERVAL } from "../../../shared/constants";
import { NewsItem } from "../../../entities/news/ui";

export const NewsList: FC<NavIdProps> = ({ id }) => {
  const [news, setNews] = useState<News[] | null>(null);
  const [popout, setPopout] = useState<ReactNode | null>(null);

  const handleFetch = useCallback(() => {
    setNews(null);
    setPopout(<ScreenSpinner size="large" />);
    getNewsList()
      .then((res) => setNews(res))
      .finally(() => setPopout(null));
  }, []);

  useEffect(() => {
    handleFetch();

    const timerId = setInterval(() => {
      handleFetch();
    }, NEWS_UPDATE_INTERVAL);

    return () => {
      clearInterval(timerId);
    };
  }, [handleFetch]);

  return (
    <SplitLayout popout={popout}>
      <Panel id={id}>
        <PanelHeader>
          Hacker News{" "}
          <Button loading={!!popout} onClick={handleFetch}>
            update
          </Button>
        </PanelHeader>

        {news?.map((item) => (
          <NewsItem key={item.id} data={item} />
        ))}
      </Panel>
    </SplitLayout>
  );
};
