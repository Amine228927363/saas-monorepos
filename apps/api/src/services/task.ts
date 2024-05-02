import { PrismaClient, Status } from '@saas-monorepo/database';
import { AbstractServiceOptions } from 'src/types/services.js';
import { UpdateTaskPayload, createTaskPayload } from 'src/types/task.js';

export class TaskServices {
  prisma: PrismaClient;
  constructor(options: AbstractServiceOptions) {
    this.prisma = options.prisma;
  }
  async createTask(payload: createTaskPayload) {
    try {
      await this.prisma.task.create({
        data: {
          name: payload.name,
          description: payload.description,
          processId: parseInt(payload.processId),
          CustomerId: payload.CustomerId,
          status: payload.status,
          dueDate: payload.dueDate,
          workspaceId: payload.workspaceId,
        },
      });
      return 'Task Created Successfully';
    } catch (error) {
      console.log(error);
      throw new Error('error creating task');
    }
  }
  //update task
  async updateTaskById(id: number, payload: UpdateTaskPayload) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id },
      });
      if (!task) {
        throw new Error(`Task with ID ${id} not found`);
      }

      const updatedTaskData: {
        name?: string;
        description?: string;
        status?: Status;
      } = {};

      if (payload.name) {
        updatedTaskData.name = payload.name;
      }
      if (payload.description) {
        updatedTaskData.description = payload.description;
      }
      if (payload.status) {
        updatedTaskData.status = payload.status;
      }
      const updatedTask = await this.prisma.task.update({
        where: { id },
        data: updatedTaskData,
      });

      return updatedTask;
    } catch (error) {
      throw new Error(`Could not update task with ID: ${id}`);
    }
  }
  //delete task
  async deleteTaskById(id: number) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id },
      });

      if (!task) {
        throw new Error(`Task with ID ${id} not found`);
      }

      await this.prisma.task.delete({
        where: { id },
      });

      return { message: 'Task deleted successfully' };
    } catch (error) {
      throw new Error(`Could not delete task with ID: ${id}`);
    }
  }
  //getall tasks
  async getAllTasks() {
    try {
      let tasks = await this.prisma.task.findMany();
      return tasks;
    } catch (e) {
      console.log('Error in getting all Tasks');
    }
  }
  async getTaskById(id: number) {
    try {
      let task = await this.prisma.task.findUnique({ where: { id } });
      if (!task) {
        console.log('This task does not exist!');
      }
      return task;
    } catch (error) {
      console.log('Error in getting the task by Id');
    }
  }
  async getTasksByCustomerId(customerId: string) {
    try {
      const tasks = await this.prisma.task.findMany({
        where: {
          CustomerId: customerId,
        },
      });
      return tasks;
    } catch (error) {
      throw new Error(`Error fetching tasks for customer ID ${customerId}`);
    }
  }
  async deleteTasksByWorkspaceId(workspaceId: number) {
    try {
      const tasks = await this.prisma.task.deleteMany({
        where: {
          workspaceId: workspaceId,
        },
      });
      return tasks;
    } catch (error) {
      console.log(error);
      throw new Error(`Could not delete tasks for workspace  with ID: ${workspaceId}`);
    }
  }
}
export default TaskServices;
