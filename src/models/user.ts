import pool from "./database";

interface UserData {
  email: string;
  name: string;
  picture: string;
}

export class UserModel {
  async create(userData: UserData) {
    console.log("chegou")
    return pool.query(`
      INSERT INTO user(email, name, picture)
      VALUES($1, $2, $3)
    `, [userData.email, userData.name, userData.picture])
  }
}