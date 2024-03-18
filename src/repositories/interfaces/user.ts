import { QueryResult } from "pg";

export interface UserData {
  email: string;
  name: string;
  picture: string;
}

export interface UserRepositoryInterface {
  create(userData: UserData): Promise<QueryResult<any>>;
}