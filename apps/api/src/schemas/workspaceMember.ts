import { userSchema } from './users.js';
import { workspaceSchema } from './workspace.js';

export const createMemberSchema = {
  body: {
    type: 'object',
    required: ['role', 'userId', 'workspaceId'],
    properties: {
      role: { type: 'string', enum: ['Editor', 'Viewer'] },
      userId: { type: 'string' },
      workspaceId: { type: 'string' },
    },
  },
  response: {
    201: {
      description: 'Workspace member created successfully',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Workspace member created' },
      },
    },
    400: {
      description: 'Bad request',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Bad request' },
      },
    },
  },
};

export const deleteMemberSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
    },
  },
  response: {
    200: {
      description: 'Workspace member deleted successfully',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Workspace member deleted' },
      },
    },
    404: {
      description: 'Workspace member not found',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Workspace member not found' },
      },
    },
  },
};

export const updateMemberSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
    },
  },
  body: {
    type: 'object',
    properties: {
      role: { type: 'string', enum: ['Editor', 'Viewer'] },
      userId: { type: 'string' },
      workspaceId: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Workspace member updated successfully',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Workspace member updated' },
      },
    },
    404: {
      description: 'Workspace member not found',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Workspace member not found' },
      },
    },
  },
};

export const getAllMembersSchema = {
  response: {
    200: {
      description: 'List of all workspace members',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          role: { type: 'string', enum: ['Editor', 'Viewer'] },
          user: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              full_name: { type: 'string' },
              email: { type: 'string', format: 'email' },
              password: { type: 'string' },
            },
          },
          workspace: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              name: { type: 'string' },
            },
          },
        },
      },
    },
  },
};
export const getMemberByIdSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
    },
  },
  response: {
    200: {
      description: 'Workspace member found',
      type: 'object',
      properties: {
        id: { type: 'number' },
        role: { type: 'string', enum: ['Editor', 'Viewer'] },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            full_name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
          },
        },
        workspace: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
          },
        },
      },
    },
    404: {
      description: 'Workspace member not found',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Workspace member not found' },
      },
    },
  },
};
export const deleteMembersByWorkspaceSchema = {
  params: {
    type: 'object',
    properties: {
      workspaceId: { type: 'integer' },
    },
  },
  response: {
    200: {
      description: 'Members deleted successfully',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Members deleted' },
      },
    },
    400: {
      description: 'Bad request',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Bad request' },
      },
    },
    404: {
      description: 'Members not found for the given workspace ID',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Members not found for the given workspace ID' },
      },
    },
    500: {
      description: 'Internal Server Error',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Internal Server Error' },
      },
    },
  },
};

export const getMembersByWorkspaceSchema = {
  params: {
    type: 'object',
    properties: {
      workspaceId: { type: 'integer' },
    },
  },
  response: {
    200: {
      description: 'List of members for the given workspace ID',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          role: { type: 'string', enum: ['Editor', 'Viewer'] },
          user: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              full_name: { type: 'string' },
              email: { type: 'string', format: 'email' },
              password: { type: 'string' },
            },
          },
          workspace: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              name: { type: 'string' },
            },
          },
        },
      },
    },
    400: {
      description: 'Bad request',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Bad request' },
      },
    },
    404: {
      description: 'Members not found for the given workspace ID',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Members not found for the given workspace ID' },
      },
    },
    500: {
      description: 'Internal Server Error',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Internal Server Error' },
      },
    },
  },
};
