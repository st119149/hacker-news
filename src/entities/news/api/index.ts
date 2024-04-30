import { apiInstance } from "../../../shared/api";
import { News } from "../../../shared/types/newsTypes";

export const getNewsDetails = (id: string) => {
  return apiInstance.get<News>(`/v0/item/${id}.json`);
};
