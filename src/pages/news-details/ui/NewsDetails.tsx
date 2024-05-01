import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  Button,
  Div,
  NavIdProps,
  Panel,
  ScreenSpinner,
  Subhead,
  Title,
} from "@vkontakte/vkui";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Comment } from "../../../entities/comment/ui/Comment";
import { getNewsDetails } from "../../../entities/news/api";
import { News } from "../../../shared/types/newsTypes";
import styles from "./NewsDetails.module.scss";

export const NewsDetails: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const params = useParams<"newsId">();

  const [newsDetails, setNewsDetails] = useState<News | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const time = useMemo(
    () =>
      newsDetails?.time && new Date(newsDetails?.time * 1000).toDateString(),
    [newsDetails?.time]
  );

  const handleUpdateComments = useCallback(() => {
    if (!params?.newsId) return;
    setNewsDetails((prevState) =>
      prevState ? { ...prevState, kids: [] } : null
    );
    getNewsDetails(params.newsId).then((res) => setNewsDetails(res));
  }, [params?.newsId]);

  useEffect(() => {
    if (!params?.newsId) return;
    setIsLoading(true);
    getNewsDetails(params.newsId).finally(() => setIsLoading(false));
    handleUpdateComments();
  }, [params?.newsId, handleUpdateComments]);

  return (
    <Panel id={id}>
      <Div>
        <Button
          className={styles.backButton}
          onClick={() => routeNavigator.push("/")}
        >
          back
        </Button>

        {isLoading ? (
          <ScreenSpinner />
        ) : (
          <>
            <Title level="1">
              <a href={newsDetails?.url} target="_blank">
                title: {newsDetails?.title}
              </a>
            </Title>
            <Subhead>
              author: {newsDetails?.by}
              <br />
              publish date: {time}
            </Subhead>
            <hr />
            <Title level="3">
              {newsDetails?.descendants} comments{" "}
              <Button size="s" onClick={handleUpdateComments}>
                update comments
              </Button>
            </Title>

            {newsDetails?.kids?.map((id) => (
              <Comment id={id} key={id} />
            ))}
          </>
        )}
      </Div>
    </Panel>
  );
};
