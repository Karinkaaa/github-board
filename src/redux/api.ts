import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { generateTasksFromIssues } from "../helpers";
import { COLUMNS, IQuery, IRepo, IRepoIssue } from "../types";

export const repoApi = createApi({
  reducerPath: "repoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set(
        "authorization",
        "Bearer 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"
      );
      return headers;
    },
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
        transformResponse: (response: IRepoIssue[], meta,arg) => {
          const result = generateTasksFromIssues(response, COLUMNS.TODO);
          console.log("- - - 1", result, response, meta,arg);

          return result;
        },
      }),
      getAssignedIssues: builder.query<IRepoIssue[], IQuery>({
        query: ({ url, page }) => {
          const pathname = new URL(url).pathname;
          return `${pathname}/issues?state=open&per_page=10&assignee=*&page=${page}`;
        },
        transformResponse: (response: IRepoIssue[]) => {
          const result = generateTasksFromIssues(response, COLUMNS.IN_PROGRESS);
          console.log("- - - 2", result);

          return result;
        },
      }),
      getClosedIssues: builder.query<IRepoIssue[], IQuery>({
        query: ({ url, page }) => {
          const pathname = new URL(url).pathname;
          return `${pathname}/issues?state=closed&per_page=10&page=${page}`;
        },
        transformResponse: (response: IRepoIssue[]) => {
          const result = generateTasksFromIssues(response, COLUMNS.DONE);
          console.log("- - - 3", result);

          return result;
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
