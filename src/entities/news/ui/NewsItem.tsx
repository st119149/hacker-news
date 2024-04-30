import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Card, ContentCard, Div } from "@vkontakte/vkui";
import { FC, useMemo } from "react";
import { Icon12FireAlt } from "@vkontakte/icons";
import { News } from "../../../shared/types/newsTypes";

interface NewsItemProps {
  data: News;
}

export const NewsItem: FC<NewsItemProps> = ({ data }) => {
  const time = useMemo(
    () => new Date(data?.time * 1000).toDateString(),
    [data?.time]
  );
  const routeNavigator = useRouteNavigator();

  return (
    <Div>
      {/* todo: add data to route state */}
      <Card onClick={() => routeNavigator.push(`/${data.id}`)}>
        <ContentCard
          header={data?.title}
          caption={
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              {data?.score}
              <Icon12FireAlt /> {time}
            </div>
          }
          subtitle={data?.by}
        />
      </Card>
    </Div>
  );
};
