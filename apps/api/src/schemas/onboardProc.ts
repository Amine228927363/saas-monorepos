import { customerSchema } from './customer.js';
import { userSchema } from './users.js';

export const onboardingProcessSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    step: { type: 'string' },
    completed: { type: 'boolean' },
    dueDate: { type: 'string', format: 'date-time' },
  },
};

// create onboarding process schema
export const createOnboardingProcessSchema = {
  body: {
    type: 'object',
    required: ['step', 'completed', 'dueDate'],
    properties: {
      step: { type: 'string' },
      completed: { type: 'boolean' },
      dueDate: { type: 'string', format: 'date-time' },
    },
  },
  response: {
    201: {
      description: 'Onboarding process created successfully',
      type: 'object',
      properties: {
        id: { type: 'string' },
        step: { type: 'string' },
        completed: { type: 'boolean' },
        dueDate: { type: 'string', format: 'date-time' },
      },
    },
  },
};

// update onboarding process schema
export const updateOnboardingProcessSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
  body: {
    type: 'object',
    properties: {
      step: { type: 'string' },
      completed: { type: 'boolean' },
      dueDate: { type: 'string', format: 'date-time' },
      customers: {
        type: 'array',
        items: customerSchema,
      },
      tasks: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            assignedTo: { type: 'string' },
            processId: { type: 'string' },
            completed: { type: 'boolean' },
            userId: { type: 'string' },
          },
        },
      },
      user: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          full_name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
        },
      },
    },
  },
  response: {
    200: {
      description: 'Onboarding process updated successfully',
      type: 'object',
      properties: {
        id: { type: 'string' },
        step: { type: 'string' },
        completed: { type: 'boolean' },
        dueDate: { type: 'string', format: 'date-time' },
        customers: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              email: { type: 'string', format: 'email' },
              name: { type: 'string' },
              status: { type: 'string' },
              organization: { type: 'string' },
              tasks: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    taskId: { type: 'string' },
                    taskName: { type: 'string' },
                  },
                },
              },
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
        tasks: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              name: { type: 'string' },
              description: { type: 'string' },
              assignedTo: { type: 'string' },
              processId: { type: 'string' },
              completed: { type: 'boolean' },
              userId: { type: 'string' },
            },
          },
        },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            full_name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
          },
        },
      },
    },
  },
};
