import { FastifyPluginAsync } from 'fastify';
import { createTaskSchema } from 'src/schemas/task.js';
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
};
export default routes;
