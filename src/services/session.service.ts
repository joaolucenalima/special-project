import { SessionRepository } from "@/repositories/session-repository";

export class SessionService {
  constructor(private sessionRepository: SessionRepository) { }

  async upsertSession(props: { session_id: string, user_id: string }) {
    const session = await this.sessionRepository.verify(props.session_id)

    if (session.rows.length === 0) {
      await this.sessionRepository.create({
        session_id: props.session_id,
        user_id: props.user_id,
        expire: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 1 month
      })

      return props.session_id
    }

    await this.sessionRepository.renew(props.session_id)

    return session.rows[0].session_id
  }
}