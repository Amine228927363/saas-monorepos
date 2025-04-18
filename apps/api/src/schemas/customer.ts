import { taskSchema } from './task.js';
import { userSchema } from './users.js';
import { workspaceSchema } from './workspace.js';

export const customerSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    email: { type: 'string', format: 'email' },
    name: { type: 'string' },
    status: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
    organization: { type: 'string' },
    workspaceId: { type: 'integer' },
    tasks: taskSchema,
    user: userSchema,
  },
};
//create customer schema
export const createCustomerSchema = {
  tags: ['customers'],
  body: {
    type: 'object',
    required: ['email', 'name'],
    properties: {
      email: { type: 'string', format: 'email' },
      name: { type: 'string' },
      status: { type: 'string' },
      organization: { type: 'string' },
      onboardingProcessID: { type: 'number' },
      workspaceId: { type: 'number' },
      TaskKeepBy: { type: 'string' },
    },
  },
  response: {
    201: {
      description: 'successfull response',
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        name: { type: 'string' },
        status: { type: 'string' },
        organization: { type: 'string' },
        onboardingProcessID: { type: 'number' },
        workspaceId: { type: 'number' },
        TaskKeepBy: { type: 'string' }, //userid who keep the task for this customer
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
      description: 'Customer does not exist',
      type: 'object',
      properties: {
        status: { type: 'number', default: 500 },
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

export const getAllCustomersSchema = {
  tags: ['customers'],
  response: {
    200: {
      description: 'Successful response',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          email: { type: 'string' },
          name: { type: 'string' },
          status: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          organization: { type: 'string' },
          onboardingProcessID: { type: 'number' },
          workspaceId: { type: 'integer' },
          tasks: { type: 'array', items: { type: 'string' } },
          user: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              email: { type: 'string' },
              fullName: { type: 'string' },
            },
          },
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
      description: 'Error response',
      type: 'object',
      properties: {
        status: { type: 'number', default: 500 },
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

export const getCustomerByIdSchema = {
  tags: ['customers'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        name: { type: 'string' },
        status: { type: 'string' },
        organization: { type: 'string' },
        onboardingProcessID: { type: 'number' },
        workspaceId: { type: 'integer' },
        tasks: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              taskId: { type: 'string' },
              taskName: { type: 'string' },
              user: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  full_name: { type: 'string' },
                },
              },
            },
          },
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
      description: 'Customer does not exist',
      type: 'object',
      properties: {
        status: { type: 'number', default: 500 },
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

export const updateCustomerSchema = {
  tags: ['customers'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    required: ['id'],
  },
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      name: { type: 'string' },
      status: { type: 'string' },
      organization: { type: 'string' },
      onboardingProcessID: { type: 'number' },
      user: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          email: { type: 'string', format: 'email' },
          full_name: { type: 'string' },
        },
      },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        customer: customerSchema,
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
      description: 'Error response',
      type: 'object',
      properties: {
        status: { type: 'number', default: 500 },
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

export const deleteCustomerSchema = {
  tags: ['customers'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    required: ['id'],
  },
  response: {
    200: {
      description: 'Customer deleted successfully',
      type: 'object',
      properties: {
        message: { type: 'string' },
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
      description: 'Error response',
      type: 'object',
      properties: {
        status: { type: 'number', default: 500 },
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};
export const getCustomersByWorkspaceSchema = {
  tags: ['customers'],
  params: {
    type: 'object',
    properties: {
      workspaceId: { type: 'number' },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'array',
      items: customerSchema,
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
      description: 'Error response',
      type: 'object',
      properties: {
        status: { type: 'number', default: 500 },
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};
export const deleteCustomersByWorkspaceSchema = {
  tags: ['customers'],
  params: {
    type: 'object',
    properties: {
      workspaceId: { type: 'number' },
    },
    required: ['workspaceId'],
  },
  response: {
    200: {
      description: 'Customers deleted successfully',
      type: 'object',
      properties: {
        message: { type: 'string' },
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
      description: 'Error response',
      type: 'object',
      properties: {
        status: { type: 'number', default: 500 },
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};
