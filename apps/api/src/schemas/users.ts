export const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    fullName: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
  },
  required: ['fullName', 'email', 'password'],
};

export const getLoggedUserDataSchema = {
  tags: ['users'],
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        full_name: { type: 'string' },
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
//get all user schema
export const getAllUsersSchema = {
  tags: ['users'],
  response: {
    200: {
      description: 'Successful response',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          email: { type: 'string' },
          full_name: { type: 'string' },
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
//get user Schema
export const getUserByIdSchema = {
  tags: ['users'],
  params: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
    },
    required: ['userId'],
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        full_name: { type: 'string' },
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
//update user Schema
export const updateUserSchema = {
  tags: ['users'],
  params: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
    },
    required: ['userId'],
  },
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      full_name: { type: 'string' },
    },
    required: [],
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        full_name: { type: 'string' },
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
//delete user Schema
export const deleteUserSchema = {
  tags: ['users'],
  params: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
    },
    required: ['userId'],
  },
  response: {
    200: {
      description: 'user deleted successfully',
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
