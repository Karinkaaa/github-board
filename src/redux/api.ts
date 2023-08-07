import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { generateTasksFromIssues } from "../helpers";
import { COLUMNS, IQuery, IRepo, IRepoIssue } from "../types";

export const repoApi = createApi({
  reducerPath: "repoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => {
    return {
      getRepoInfo: builder.query<IRepo, string>({
        query: (url) => {
          const pathname = new URL(url).pathname;
          sessionStorage.setItem("URL", url);

          return pathname;
        },
      }),
      getNewIssues: builder.query<IRepoIssue[], IQuery>({
        query: ({ url, page }) => {
          const pathname = new URL(url).pathname;
          return `${pathname}/issues?state=open&per_page=10&page=${page}`;
        },
        transformResponse: (response: IRepoIssue[]) => {
          return generateTasksFromIssues(response, COLUMNS.TODO);
        },
      }),
      getAssignedIssues: builder.query<IRepoIssue[], IQuery>({
        query: ({ url, page }) => {
          const pathname = new URL(url).pathname;
          return `${pathname}/issues?state=open&per_page=10&assignee=*&page=${page}`;
        },
        transformResponse: (response: IRepoIssue[]) => {
          return generateTasksFromIssues(response, COLUMNS.IN_PROGRESS);
        },
      }),
      getClosedIssues: builder.query<IRepoIssue[], IQuery>({
        query: ({ url, page }) => {
          const pathname = new URL(url).pathname;
          return `${pathname}/issues?state=closed&per_page=10&page=${page}`;
        },
        transformResponse: (response: IRepoIssue[]) => {
          return generateTasksFromIssues(response, COLUMNS.DONE);
        },
      }),
    };
  },
});

export const {
  useGetRepoInfoQuery,
  useGetNewIssuesQuery,
  useGetAssignedIssuesQuery,
  useGetClosedIssuesQuery,
} = repoApi;

export default repoApi;
