import { SessionRepository } from "@/repositories/session-repository";
import { randomUUID } from "crypto";

export class SessionService {
  constructor(private sessionRepository: SessionRepository) { }

  async upsertSession(user_id: string) {
    const session = await this.sessionRepository.findByUserId(user_id)

    if (session.rows.length === 0) {
      const session_id = randomUUID()

      await this.sessionRepository.create({
        session_id,
        user_id,
        expire: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 1 month
      })

      return session_id
    }

    await this.sessionRepository.renew(session.rows[0].session_id)

    return session.rows[0].session_id
  }

  async verifySession(session_id: string) {
    const session = await this.sessionRepository.findBySessionId(session_id)

    if (session.rows.length === 0) {
      return null
    }

    if (session.rows[0].expire < new Date()) {
      return null
    }

    return session.rows[0]
  }
}