import { apiInstance } from "../../../shared/api";
import { News } from "../../../shared/types/newsTypes";

export const getNewsList = (limit: number = 100) => {
  return apiInstance
    .get<number[]>("/v0/newstories.json")
    .then((res) =>
      Promise.all(
        res
          .slice(0, limit)
          .map((id) => apiInstance.get<News>(`/v0/item/${id}.json`))
      )
    );
};
