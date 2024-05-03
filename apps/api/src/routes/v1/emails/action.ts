import { FastifyPluginAsync } from 'fastify';
import sendEmailSchema, { contactCustomerSchema } from 'src/schemas/email.js';
import { contactCustomer, sendEmail } from 'src/services/emailServices.js';
import { Customer } from 'src/types/customers.js';
import { contactEmail, shareEmail } from 'src/types/email.js';
import { User } from 'src/types/users.js';

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{ Body: shareEmail }>(
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

  fastify.post<{ Body: contactEmail }>(
    '/contactCustomer',
    { schema: contactCustomerSchema },
    async (request, reply) => {
      const { body: contactRequest } = request;
      try {
        // Call the service function to handle the contact customer logic
        await contactCustomer(contactRequest);
        reply.send({ success: true, message: 'Contact request sent successfully!' });
      } catch (error) {
        console.error('Error sending contact request:', error);
        reply.status(500).send({ success: false, message: 'Failed to send contact request' });
      }
    },
  );
};

export default routes;
