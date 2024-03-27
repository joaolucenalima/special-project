import pool from "@/database/connect";
import { Session } from "@/database/models/session-model";
import { SessionRepositoryInterface } from "./interfaces/session";

export class SessionRepository implements SessionRepositoryInterface {
  async create(session: Session) {
    return pool.query(`
      INSERT INTO sessions(session_id, user_id, expire)
      VALUES($1, $2, $3)
    `, [session.session_id, session.user_id, session.expire])
  }

  async findByUserId(user_id: string) {
    return pool.query(`
      SELECT * FROM sessions WHERE user_id = $1
    `, [user_id])
  }

  async findBySessionId(session_id: string) {
    return pool.query(`
      SELECT * FROM sessions WHERE session_id = $1
    `, [session_id])
  }

  async renew(session_id: string) {
    return pool.query(`
      UPDATE sessions SET expire = NOW() + INTERVAL '30 days' WHERE session_id = $1
    `, [session_id])
  }

  async delete(session_id: string) {
    return pool.query(`
      DELETE FROM sessions WHERE session_id = $1
    `, [session_id])
  }
}