import { FastifyPluginAsync } from 'fastify';
import sendEmailSchema from 'src/schemas/email.js';
import { sendEmail } from 'src/services/emailServices.js';
import { Customer } from 'src/types/customers.js';
import { User } from 'src/types/users.js';

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{ Body: User }>(
    '/sendEmail',
    { schema: sendEmailSchema },
    async (request, reply) => {
      const { body: user } = request;
      try {
        await sendEmail(user);
        reply.send({ success: true, message: ' email sent successfully!' });
      } catch (error) {
        console.error('Error sending  email:', error);
        reply.status(500).send({ success: false, message: 'Failed to send  email' });
      }
    },
  );
};
export default routes;
