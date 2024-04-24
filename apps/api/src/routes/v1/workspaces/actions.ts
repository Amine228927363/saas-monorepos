import { FastifyPluginAsync } from 'fastify';
import {
  createWorkspaceSchema,
  deleteWorkspaceSchema,
  getAllWorkspaceSchema,
  updateWorkspaceSchema,
} from 'src/schemas/workspace.js';
import WorkspaceServices from 'src/services/workspace.js';
import { createWorkspacePayload, updateWorkspacePayload } from 'src/types/Workspace.js';

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const { prisma } = fastify;
  const workspaceService = new WorkspaceServices({ prisma });

  // Create workspace route
  fastify.post<{ Body: createWorkspacePayload }>(
    '/createWorkspace',
    { schema: createWorkspaceSchema },
    async (request, reply) => {
      try {
        const workspace = await workspaceService.createWorkspace(request.body);
        return reply.code(201).send({ message: 'Workspace created successfully', workspace });
      } catch (error) {
        console.error('Error creating workspace:', error);
        return reply.status(500).send({ message: 'Error creating workspace' });
      }
    },
  );

  // Get all workspaces route
  fastify.get<{}>('/workspaces', { schema: getAllWorkspaceSchema }, async (request, reply) => {
    try {
      const workspaces = await workspaceService.getAllWorkspaces();
      return reply.send(workspaces);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
      return reply.status(500).send({ message: 'Error fetching workspaces' });
    }
  });

  // Get workspace by ID route

  // Update workspace route
  fastify.put<{ Params: { id: number }; Body: updateWorkspacePayload }>(
    '/updateWorkspace/:id',
    { schema: updateWorkspaceSchema },
    async (request, reply) => {
      const { id } = request.params;
      const { body } = request;
      try {
        const updatedWorkspace = await workspaceService.updateWorkspace(id, body);
        if (!updatedWorkspace) {
          return reply.status(404).send({ message: 'Workspace not found' });
        }
        return reply.send({
          message: 'Workspace updated successfully',
          workspace: updatedWorkspace,
        });
      } catch (error) {
        console.error('Error updating workspace:', error);
        return reply.status(500).send({ message: 'Error updating workspace' });
      }
    },
  );

  // Delete workspace route
  fastify.delete<{ Params: { id: number } }>(
    '/deleteWorkspace/:id',
    { schema: deleteWorkspaceSchema },
    async (request, reply) => {
      const { id } = request.params;
      try {
        const deletedWorkspace = await workspaceService.deleteWorkspace(id);
        if (!deletedWorkspace) {
          return reply.status(404).send({ message: 'Workspace not found' });
        }
        return reply.send({ message: 'Workspace deleted successfully' });
      } catch (error) {
        console.error('Error deleting workspace:', error);
        return reply.status(500).send({ message: 'Error deleting workspace' });
      }
    },
  );
};

export default routes;
