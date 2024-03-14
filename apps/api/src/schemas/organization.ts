import { customerSchema } from './customer.js';

export const orgSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    email: { type: 'string', format: 'email' },
    name: { type: 'string' },
    phone: { type: 'string' },
    customerId: { type: 'string' },
  },
  required: ['id', 'email', 'name'],
};
export const createOrganizationSchema = {
  tags: ['organizations'],
  body: {
    type: 'object',
    required: ['email', 'name', 'phone'],
    properties: {
      email: { type: 'string', format: 'email' },
      name: { type: 'string' },
      phone: { type: 'string' },
      customers: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
  },
  response: {
    201: {
      description: 'Successful response',
      type: 'object',
      properties: {
        id: { type: 'number' },
        email: { type: 'string', format: 'email' },
        name: { type: 'string' },
        phone: { type: 'string' },
        customerId: { type: 'string' },
      },
    },
  },
  '4xx': {
    type: 'object',
    properties: {
      status: { type: 'number' },
      code: { type: 'string' },
      message: { type: 'string' },
    },
  },
  500: {
    description: 'Organization does not exist',
    type: 'object',
    properties: {
      status: { type: 'number', default: 500 },
      code: { type: 'string' },
      message: { type: 'string' },
    },
  },
};
export const updateOrganizationSchema = {
  tags: ['organizations'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  },
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      name: { type: 'string' },
      phone: { type: 'string' },
      customers: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        id: { type: 'number' },
        email: { type: 'string', format: 'email' },
        name: { type: 'string' },
        phone: { type: 'string' },
        customerId: { type: 'string' },
      },
    },
  },
  '4xx': {
    type: 'object',
    properties: {
      status: { type: 'number' },
      code: { type: 'string' },
      message: { type: 'string' },
    },
  },
  500: {
    description: 'Organization does not exist',
    type: 'object',
    properties: {
      status: { type: 'number', default: 500 },
      code: { type: 'string' },
      message: { type: 'string' },
    },
  },
};
export const deleteOrganizationSchema = {
  tags: ['organizations'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  },
  response: {
    204: {
      description: 'Organization deleted successfully',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Organization deleted successfully' },
      },
    },
  },
  '4xx': {
    type: 'object',
    properties: {
      status: { type: 'number' },
      code: { type: 'string' },
      message: { type: 'string' },
    },
  },
  500: {
    description: 'Organization doesnt exist',
    type: 'object',
    properties: {
      status: { type: 'number', default: 500 },
      code: { type: 'string' },
      message: { type: 'string' },
    },
  },
};
