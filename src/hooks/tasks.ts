import {
  useGetAssignedIssuesQuery,
  useGetClosedIssuesQuery,
  useGetNewIssuesQuery,
} from "../redux/api";
import { QueryFnType } from "../types";
import { useLoadMore } from "./loadMore";

export const useTasks = (url: string) => {
  const columns = [
    useLoadMore(url, useGetNewIssuesQuery as QueryFnType),
    useLoadMore(url, useGetAssignedIssuesQuery as QueryFnType),
    useLoadMore(url, useGetClosedIssuesQuery as QueryFnType),
  ];

  const loadMore = (index: number) => {
    columns[index].loadMore();
  };

  return {
    tasks: columns.map((column) => column.data),
    loadMore,
  };
};
