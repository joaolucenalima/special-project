import { QueryResult } from "pg";
import { User } from "../../database/models/user-model";

export interface UserData {
  email: string;
  name: string;
  picture: string;
}

export interface UserRepositoryInterface {
  create(userData: UserData): Promise<QueryResult<any>>;
  findByEmail(email: string): Promise<QueryResult<User>>;
}