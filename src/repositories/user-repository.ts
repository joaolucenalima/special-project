import pool from "@/database/database";
import { UserData, UserRepositoryInterface } from "./interfaces/user";

export class UserRepository implements UserRepositoryInterface {
  async create(userData: UserData) {
    return pool.query(`
      INSERT INTO "user"(email, name, picture)
      VALUES($1, $2, $3)
    `, [userData.email, userData.name, userData.picture])
  }

  async findByEmail(email: string) {
    return pool.query(`
      SELECT * FROM "user"
      WHERE email = $1
    `, [email])
  }
}