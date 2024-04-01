import { FastifyPluginAsync } from 'fastify';
import { createTaskSchema, getAllTaskSchema, getTaskByCustomerIdSchema } from 'src/schemas/task.js';
import TaskServices from 'src/services/task.js';
import { createTaskPayload } from 'src/types/task.js';

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const { prisma } = fastify;
  const TaskService = new TaskServices({ prisma });
  fastify.post<{ Body: createTaskPayload }>(
    '/createTask',
    { schema: createTaskSchema },
    async (request, reply) => {
      try {
        const task = await TaskService.createTask(request.body);
        return reply.send('task created successfully');
      } catch (error) {
        console.log(error);
        return reply.send('error creating task');
      }
    },
  );
  fastify.get<{}>('/tasks', { schema: getAllTaskSchema }, async (req, reply) => {
    const tasks = await TaskService.getAllTasks();
    return tasks;
  });
  fastify.get<{ Params: { customerId: string } }>(
    '/customer/:customerId',
    { schema: getTaskByCustomerIdSchema },
    async (req, reply) => {
      const { customerId } = req.params;
      const tasks = await TaskService.getTasksByCustomerId(customerId);
      return tasks;
    },
  );
};
export default routes;
