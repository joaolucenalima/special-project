import { User } from "@/database/models/user-model";
import { QueryResult } from "pg";

export interface UserData {
  email: string;
  name: string;
  picture: string;
}

export interface UserRepositoryInterface {
  create(userData: UserData): Promise<QueryResult<any>>;
  findByEmail(email: string): Promise<QueryResult<User>>;
}