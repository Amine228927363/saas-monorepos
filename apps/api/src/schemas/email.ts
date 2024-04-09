import { FastifySchema } from 'fastify';
import { Customer } from 'src/types/customers.js';

const sendWelcomeEmailSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['name', 'email', 'organization', 'status'], // Update with required fields
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      organization: { type: 'string' },
      status: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
    500: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
  },
};

export default sendWelcomeEmailSchema;
