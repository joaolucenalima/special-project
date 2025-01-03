import { Session } from "@/database/models/session-model";
import { QueryResult } from "pg";

export interface SessionRepositoryInterface {
  create(session: Session): Promise<QueryResult<any>>;
  findByUserId(session_id: string): Promise<QueryResult<Session>>;
  findBySessionId(session_id: string): Promise<QueryResult<Session>>;
  renew(session_id: string): Promise<QueryResult<any>>;
  delete(session_id: string): Promise<QueryResult<any>>;
}