import { PrismaClient } from '@saas-monorepo/database';
import { createWorkspacePayload, updateWorkspacePayload } from 'src/types/Workspace.js';
import { AbstractServiceOptions } from 'src/types/services.js';

export class WorkspaceServices {
  prisma: PrismaClient;

  constructor(options: AbstractServiceOptions) {
    this.prisma = options.prisma;
  }

  async createWorkspace(payload: createWorkspacePayload) {
    try {
      const workspace = await this.prisma.workspace.findFirst({
        where: { name: payload.name },
      });
      if (workspace) {
        throw new Error('Workspace with the same name already exists');
      }

      const newWorkspace = await this.prisma.workspace.create({
        data: {
          name: payload.name,
        },
      });

      return newWorkspace;
    } catch (error) {
      console.error('Could not create workspace:', error);
      throw new Error('Could not create workspace');
    }
  }

  async updateWorkspace(id: number, payload: updateWorkspacePayload) {
    try {
      const workspace = await this.prisma.workspace.findUnique({
        where: { id: id },
      });
      if (!workspace) {
        throw new Error('Workspace not found');
      }

      const updatedWorkspace = await this.prisma.workspace.update({
        where: { id },
        data: payload,
      });

      return updatedWorkspace;
    } catch (error) {
      console.error('Could not update workspace:', error);
      throw new Error('Could not update workspace');
    }
  }
  async getAllWorkspaces() {
    try {
      const allWorkspaces = await this.prisma.workspace.findMany();
      return allWorkspaces;
    } catch (error) {
      console.log('Error getting Workspaces', error);
      throw new Error('Could not retrieve workspaces');
    }
  }
  async deleteWorkspace(id: number) {
    try {
      const workspace = await this.prisma.workspace.findUnique({
        where: { id: id },
      });
      if (!workspace) {
        throw new Error('Workspace not found');
      }

      await this.prisma.workspace.delete({
        where: { id },
      });

      return workspace;
    } catch (error) {
      console.error('Could not delete workspace:', error);
      throw new Error('Could not delete workspace');
    }
  }
}
export default WorkspaceServices;
