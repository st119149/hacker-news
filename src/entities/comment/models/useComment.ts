import { ReactNode, useEffect, useState } from "react";
import { apiInstance } from "../../../shared/api";
import { Comment } from "../../../shared/types/commentTypes";

export const useComment = (id: number) => {
  const [comment, setComment] = useState<Comment | null>(null);
  const [isLoading, setIsLoading] = useState<ReactNode | null>(null);
  // add abort controller

  useEffect(() => {
    setIsLoading(true);
    apiInstance
      .get<Comment>(`/v0/item/${id}.json`)
      .then((res) => setComment(res))
      .finally(() => setIsLoading(false));
  }, [id]);

  return [comment, isLoading] as const;
};
