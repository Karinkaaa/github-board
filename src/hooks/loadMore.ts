import { useEffect, useState } from "react";
import { IQuery, IQueryResponse, ITask } from "../types";

const empty: ITask[] = [];

export const useLoadMore = (
  url: string,
  queryFn: (value: IQuery) => IQueryResponse
) => {
  const [tasks, setTasks] = useState<ITask[]>(empty);
  const [page, setPage] = useState<number>(1);
  const { data = empty } = queryFn({ url, page });

  useEffect(() => {
    setTasks((prev) => [...prev, ...data]);
  }, [data]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return {
    data: tasks,
    loadMore,
  };
};
