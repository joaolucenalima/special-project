import pool from "@/database/connect";
import { TaskData, TaskRepositoryInterface } from "./interfaces/task";

export class TaskRepository implements TaskRepositoryInterface {
  async create(taskData: TaskData) {
    return pool.query(`
      INSERT INTO task(
        user_id,
        title,
        theme,
        description,
        status,
        term,
        created_at
      )
      VALUES($1, $2, $3, $4, $5, $6, now())
      RETURNING *
    `, Object.values(taskData))
  }
}