import { taskSchema } from './task.js';

export const onboardingProcessSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    step: { type: 'string' },
  },
};

// create onboarding process schema
export const createOnboardingProcessSchema = {
  body: {
    type: 'object',
    properties: {
      step: { type: 'string' },
    },
  },
  response: {
    201: {
      description: 'Onboarding process created successfully',
      type: 'object',
      properties: {
        id: { type: 'number' },
        step: { type: 'string' },
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
    },
  },
  response: {
    200: {
      description: 'Onboarding process updated successfully',
      type: 'object',
      properties: {
        id: { type: 'string' },
        step: { type: 'string' },
      },
    },
  },
};

export const getAllOnboardsSchema = {
  response: {
    200: {
      description: 'Get all onboarding processes successfully',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          step: { type: 'string' },
        },
      },
    },
  },
};

export const deleteOnboardSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Onboarding process deleted successfully',
      type: 'object',
      properties: {
        id: { type: 'string' },
        step: { type: 'string' },
      },
    },
    404: {
      description: 'Onboarding process not found',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};
export const getOnboardingProcessByIdSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Onboarding process found',
      type: 'object',
      properties: {
        id: { type: 'string' },
        step: { type: 'string' },
      },
    },
    404: {
      description: 'Onboarding process not found',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};
export const getOnboardingProcessByStepSchema = {
  params: {
    type: 'object',
    properties: {
      step: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Onboarding process found',
      type: 'object',
      properties: {
        id: { type: 'string' },
        step: { type: 'string' },
      },
    },
    404: {
      description: 'Onboarding process not found',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};
