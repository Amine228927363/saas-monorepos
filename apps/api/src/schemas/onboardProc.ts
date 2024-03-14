import { customerSchema } from './customer.js';
import { userSchema } from './users.js';

export const onboardingProcessSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    step: { type: 'string' },
    completed: { type: 'boolean' },
    dueDate: { type: 'string', format: 'date-time' },
    customers: customerSchema,
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
    user: userSchema,
  },
};
//create onboarding process schema
export const createOnboardingProcessSchema = {
  body: {
    type: 'object',
    required: ['step'],
    properties: {
      step: { type: 'string' },
      completed: { type: 'boolean' },
      dueDate: { type: 'string', format: 'date-time' },
      customer: { type: 'array', items: { type: 'string' } },
      tasks: { type: 'array', items: { type: 'string' } },
      user: { type: 'array', items: { type: 'string' } },
    },
  },
  response: {
    201: {
      description: 'Onboarding process created successfully',
      type: 'object',
      properties: {
        id: { type: 'integer' },
        step: { type: 'string' },
        completed: { type: 'boolean' },
        dueDate: { type: 'string', format: 'date-time' },
        customer: { type: 'array', items: { type: 'string' } },
        tasks: { type: 'array', items: { type: 'string' } },
        user: { type: 'array', items: { type: 'string' } },
      },
    },
  },
};

//update onboarding process schema
export const updateOnboardingProcessSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
    },
  },
  body: {
    type: 'object',
    properties: {
      step: { type: 'string' },
      completed: { type: 'boolean' },
      dueDate: { type: 'string', format: 'date-time' },
      customer: { type: 'array', items: { type: 'string' } },
      tasks: { type: 'array', items: { type: 'string' } },
      user: { type: 'array', items: { type: 'string' } },
    },
  },
  response: {
    200: {
      description: 'Onboarding process updated successfully',
      type: 'object',
      properties: {
        id: { type: 'integer' },
        step: { type: 'string' },
        completed: { type: 'boolean' },
        dueDate: { type: 'string', format: 'date-time' },
        customer: { type: 'array', items: { type: 'string' } },
        tasks: { type: 'array', items: { type: 'string' } },
        user: { type: 'array', items: { type: 'string' } },
      },
    },
  },
};
