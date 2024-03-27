import { TaskData, TaskRepositoryInterface } from "@/repositories/interfaces/task";

export class TaskService {
  constructor(private taskRepository: TaskRepositoryInterface) { }

  async createTask(taskData: TaskData) {
    return this.taskRepository.create(taskData);
  }
}