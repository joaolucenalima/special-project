import { TaskRepository } from "@/repositories/task-repository"
import { TaskService } from "../task.service"

export function makeTaskService() {
  const taskRepository = new TaskRepository()
  return new TaskService(taskRepository)
}