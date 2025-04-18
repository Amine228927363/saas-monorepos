import { FastifyPluginAsync } from 'fastify';
import { request } from 'http';
import _ from 'lodash';

import { authCheckSchema, loginSchema, registerSchema } from '../../../schemas/index.js';
import { AuthenticationService } from '../../../services/authentication.js';
import { LoginPayload, RegisterPayload, ResetPayload } from '../../../types/auth.js';

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const { prisma } = fastify;
  const authService = new AuthenticationService({ prisma });
  fastify.post<{ Body: LoginPayload }>(
    '/login',
    {
      schema: loginSchema,
    },
    async (request, reply) => {
      try {
        const data = await authService.login(request.body);

        // Generating Token
        return reply.code(200).send({
          access_token: data.accessToken,
          user: _.omit(data.user, ['password']),
        });
      } catch (err) {
        throw err;
      }
    },
  );
  fastify.post<{ Body: RegisterPayload }>(
    '/register',
    {
      schema: registerSchema,
    },
    async (request, reply) => {
      try {
        const data = await authService.register(request.body);
        return data;
      } catch (err) {
        throw err;
      }
    },
  );
  fastify.get(
    '/authcheck',
    {
      schema: authCheckSchema,
      preHandler: [fastify.verifyToken],
    },
    async (request, reply) => {
      try {
        const data = await authService.authCheck({
          id: request.loggedUser.id,
        });
        return reply.code(200).send({ user: data });
      } catch (err) {
        throw err;
      }
    },
  );
};

export default routes;
