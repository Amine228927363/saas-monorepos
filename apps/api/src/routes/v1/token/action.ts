import { FastifyPluginAsync } from 'fastify';
import { tokenGeneratorSchema, tokenVerifySchema } from 'src/schemas/tokenGenerate.js';
import { generateToken, verifyWorkspaceToken } from 'src/services/tokenGenerate.js';

import { UsersService } from '../../../services/users.js';

interface TokenPayload {
  workspaceId: number;
  role: string;
  email: string;
}
interface tokenVerif {
  token: string;
}
const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{ Body: TokenPayload }>(
    '/generateToken',
    { schema: tokenGeneratorSchema },
    async (request, reply) => {
      const { workspaceId, role, email } = request.body;
      const payload: TokenPayload = { workspaceId, role, email };
      try {
        const token = await generateToken(payload);
        console.log('Generated token:', token);
        return reply.status(200).send(token);
      } catch (error) {
        console.error('Error generating token:', error);
        reply.status(500).send({ error: 'Failed to generate token' });
      }
    },
  );
  fastify.get<{ Querystring: tokenVerif }>(
    '/verifyToken',
    { schema: tokenVerifySchema },
    async (request, reply) => {
      const { token } = request.query;
      try {
        const member = await verifyWorkspaceToken(token);
        if (!member) {
          return reply.status(404).send({ error: 'Member not found' });
        }
        return reply.status(200).send(member);
      } catch (error) {
        console.error('Error verifying token:', error);
        return reply.status(400).send({ error: 'Invalid token' });
      }
    },
  );
};
export default routes;
