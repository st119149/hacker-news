import { Comment } from "../../../shared/types/commentTypes";
import { apiInstance } from "../../../shared/api";

export const getComments = (id: string) => {
  return apiInstance.get<Comment>(`/v0/item/${id}.json`);
};
