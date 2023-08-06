import { ColumnType, IRepoIssue, ITask } from "../types";

export const generateTasksFromIssues = (
  issues: IRepoIssue[],
  column: ColumnType
): ITask[] => {
  return issues.map((item) => ({
    ...item,
    column,
  }));
};
