import { useEffect, useState } from "react";
import { News } from "../../../shared/types/newsTypes";
import { getNewsDetails } from "../api";

export const useNews = (id?: string) => {
  const [news, setNews] = useState<News | null>(null);
  // add abort controller

  useEffect(() => {
    if (typeof id !== "undefined")
      getNewsDetails(id).then((res) => setNews(res));
  }, [id]);

  return [news, setNews] as const;
};
