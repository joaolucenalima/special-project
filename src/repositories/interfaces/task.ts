import { QueryResult } from "pg";

export interface TaskData {
  user_id: string;
  title: string;
  theme: string;
  description?: string;
  status: boolean;
  term?: Date;
}

export interface TaskRepositoryInterface {
  create(taskData: TaskData): Promise<QueryResult<any>>;
}