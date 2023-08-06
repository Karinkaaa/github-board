import { COLUMNS, ColumnType, IRepoIssue } from ".";

export interface ITask extends IRepoIssue {
  column: ColumnType;
}

export type SetItemsPropType = ITasksMap | ((items: ITasksMap) => ITasksMap);

interface ITasksMap {
  [COLUMNS.TODO]: ITask[];
  [COLUMNS.IN_PROGRESS]: ITask[];
  [COLUMNS.DONE]: ITask[];
}
