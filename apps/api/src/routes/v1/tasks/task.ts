import { FastifyPluginAsync } from 'fastify';
import {
  createTaskSchema,
  deleteTaskByWorkspaceIdSchema,
  deleteTaskSchema,
  getAllTaskSchema,
  getTaskByCustomerIdSchema,
  updateTaskSchema,
} from 'src/schemas/task.js';
import TaskServices from 'src/services/task.js';
import { UpdateTaskPayload, createTaskPayload } from 'src/types/task.js';

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
  //update task
  fastify.put<{ Params: { id: number }; Body: UpdateTaskPayload }>(
    '/updateTask/:id',
    { schema: updateTaskSchema },
    async (request, reply) => {
      const { id } = request.params;
      const { body } = request;
      try {
        const updatedTask = await TaskService.updateTaskById(id, body);
        if (!updatedTask) {
          return reply.status(404).send({ message: 'Task not found' });
        }
        return reply.send({ message: 'Task updated successfully', task: updatedTask });
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ message: 'Error updating task' });
      }
    },
  );
  fastify.delete<{ Params: { id: number } }>(
    '/deleteTask/:id',
    { schema: deleteTaskSchema },
    async (request, reply) => {
      const { id } = request.params;
      try {
        const deletedTask = await TaskService.deleteTaskById(id);
        if (!deletedTask) {
          return reply.status(404).send({ message: 'Task not found' });
        }
        return reply.send({ message: 'Task deleted successfully' });
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ message: 'Error deleting task' });
      }
    },
  );
  fastify.delete<{ Params: { workspaceId: number } }>(
    '/deleteTasks/workspace/:workspaceId',
    { schema: deleteTaskByWorkspaceIdSchema },
    async (request, reply) => {
      const { workspaceId } = request.params;
      try {
        await TaskService.deleteTasksByWorkspaceId(workspaceId);
        return reply.send({ message: 'Tasks deleted successfully for customer', workspaceId });
      } catch (error) {
        console.log(error);
        return reply
          .status(500)
          .send({ message: 'Error deleting tasks for customer', workspaceId });
      }
    },
  );
};
export default routes;
