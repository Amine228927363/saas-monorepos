import { FastifyPluginAsync } from 'fastify';
import sendWelcomeEmailSchema from 'src/schemas/email.js';
import { sendWelcomeEmail } from 'src/services/emailServices.js';
import { Customer } from 'src/types/customers.js';

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{ Body: Customer }>(
    '/sendEmail',
    { schema: sendWelcomeEmailSchema },
    async (request, reply) => {
      const { body: customer } = request;
      try {
        await sendWelcomeEmail(customer);
        reply.send({ success: true, message: 'Welcome email sent successfully!' });
      } catch (error) {
        console.error('Error sending welcome email:', error);
        reply.status(500).send({ success: false, message: 'Failed to send welcome email' });
      }
    },
  );
};
export default routes;
