import { FastifySchema } from 'fastify';

export const tokenGeneratorSchema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      role: { type: 'string' },
      workspaceId: { type: 'integer' }, // Add workspaceId property
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
      },
    },
    400: {
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
    },
  },
};

export const tokenVerifySchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      token: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        role: { type: 'string', enum: ['Editor', 'Viewer'] },
        userId: { type: 'string' },
        workspaceId: { type: 'string' },
      },
    },
    400: {
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
    },
  },
};
