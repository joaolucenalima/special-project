import { TaskRepository } from "@/repositories/task-repository";
import { TaskService } from "@/services/task.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);

async function addTask(request: FastifyRequest, reply: FastifyReply) {
  const TaskBodySchema = z.object({
    title: z.string(),
    theme: z.string(),
    description: z.string().optional(),
    status: z.boolean(),
    term: z.date().optional(),
  })

  const taskData = TaskBodySchema.parse(request.body);

  try {
    const task = await taskService.createTask({
      user_id: request.user_id,
      title: taskData.title,
      theme: taskData.theme,
      description: taskData.description,
      status: taskData.status,
      term: taskData.term,
    });

    reply.code(201).send({ task });
  } catch (error) {
    console.log(error)
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

export default addTask;