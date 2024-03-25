import { FastifyPluginAsync } from 'fastify';
import { updateUserPayload } from 'src/types/users.js';

import {
  deleteUserSchema,
  getAllUsersSchema,
  getLoggedUserDataSchema,
  getUserByIdSchema,
  updateUserSchema,
} from '../../../schemas/users.js';
import { UsersService } from '../../../services/users.js';
import autohooks from './autohooks.js';

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const { prisma } = fastify;
  const usersService = new UsersService({ prisma });

  fastify.get(
    '/me',
    {
      schema: getLoggedUserDataSchema,
    },
    async (request, reply) => {
      try {
        const data = await usersService.getLoggedUserData(request.loggedUser.id);
        return reply.code(200).send(data);
      } catch (err) {
        throw err;
      }
    },
  );

  fastify.get<{ Params: { id: string } }>(
    '/user/:id',
    { schema: getUserByIdSchema },
    async (request, reply) => {
      const userId = request.params.id;
      if (!userId || userId.trim().length === 0) {
        return reply.status(400).send('Invalid id');
      }
      const data = await usersService.getUser(userId);
      if (!data) {
        return reply.status(404).send(`User with the id ${userId} 
      was not found`);
      }
      return reply.status(200).send(data);
    },
  );

  fastify.get('/allUsers', { schema: getAllUsersSchema }, async (request, reply) => {
    const users = await usersService.getAllUsers();
    return reply.send(users);
  });

  fastify.put<{ Params: { id: string } }>(
    '/updateUser/:id',
    { schema: updateUserSchema },
    async (request, reply) => {
      const userId = request.params.id;
      const body: updateUserPayload = request.body as updateUserPayload;

      if (!userId) {
        return reply.status(400).send('Invalid id');
      }

      try {
        const data = await usersService.updateUser(userId, body);
        if (!data) {
          return reply.status(404).send(`User with the id ${userId} was not found`);
        }
        return reply.status(200).send(data);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('Internal Server Error');
      }
    },
  );

  fastify.delete<{ Params: { id: string } }>(
    '/deleteUser/:id',
    { schema: deleteUserSchema },
    async (request, reply) => {
      const userId = request.params.id;

      if (!userId) {
        return reply.status(400).send('Invalid id');
      }

      try {
        await usersService.deleteUser(userId);
        return reply.status(204).send(`User with the id ${userId} was deleted`);
      } catch (err) {
        fastify.log.error(err);
        return reply.status(500).send('Server error');
      }
    },
  );
};
export default routes;
