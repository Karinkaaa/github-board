import { ITask } from "./task";

export interface IQueryResponse {
  data: ITask[];
  isLoading?: boolean;
  isError?: boolean;
}

export interface IQuery {
  url: string;
  page: number;
}

export type QueryFnType = (value: IQuery) => IQueryResponse;
