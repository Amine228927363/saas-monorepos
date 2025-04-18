import { FastifySchema } from 'fastify';
import { Customer } from 'src/types/customers.js';

const sendEmailSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['email', 'full_name'], // Update with required fields
    properties: {
      email: { type: 'string', format: 'email' },
      full_name: { type: 'string' },
      role: { type: 'string' },
      link: { type: 'string' },
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
export const contactCustomerSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['name', 'email', 'message', 'subject'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      message: { type: 'string' },
      subject: { type: 'string' },
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
        success: { type: 'boolean', default: false },
        message: { type: 'string' },
      },
    },
  },
};
export default sendEmailSchema;
