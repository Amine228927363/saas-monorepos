enum Status {
  ToDo = 'ToDo',
  InProgress = 'InProgress',
  Done = 'Done',
}
export const taskSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    description: { type: ['string', 'null'] },
    processId: { type: ['integer', 'null'] },
    CustomerId: { type: ['string', 'null'] },
    workspaceId: { type: 'integer' },
    status: { type: 'string', enum: ['ToDo', 'InProgress', 'Done'] },
    dueDate: { type: 'string', format: 'date-time' },
  },
  required: ['name', 'status', 'dueDate'],
};

export const createTaskSchema = {
  tags: ['tasks'],
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      processId: { type: 'integer' },
      CustomerId: { type: 'string' },
      workspaceId: { type: 'integer' },
      status: { type: 'string', enum: ['ToDo', 'InProgress', 'Done'] },
      dueDate: { type: 'string', format: 'date-time' },
    },
    required: ['name', 'processId', 'CustomerId'],
  },
  response: {
    201: {
      description: 'Task created successfully',
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        description: { type: 'string' },
        processId: { type: 'integer' },
        CustomerId: { type: 'string' },
        status: { type: 'string', enum: ['ToDo', 'InProgress', 'Done'] },
        dueDate: { type: 'string', format: 'date-time' },
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
    description: 'Server Error',
    type: 'object',
    properties: {
      status: { type: 'number', default: 500 },
      code: { type: 'string' },
      message: { type: 'string' },
    },
  },
};

export const updateTaskSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
    },
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      status: { type: 'string', enum: ['ToDo', 'InProgress', 'Done'] },
    },
  },
  response: {
    200: {
      description: 'Task updated successfully',
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        description: { type: 'string' },
        processId: { type: 'integer' },
        CustomerId: { type: 'string' },
        status: { type: 'string', enum: ['ToDo', 'InProgress', 'Done'] },
        dueDate: { type: 'string', format: 'date-time' },
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
    description: 'Server Error',
    type: 'object',
    properties: {
      status: { type: 'number', default: 500 },
      code: { type: 'string' },
      message: { type: 'string' },
    },
  },
};

export const deleteTaskSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
  },
  response: {
    200: {
      description: 'Task deleted successfully',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Task deleted' },
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
    description: 'Server Error',
    type: 'object',
    properties: {
      status: { type: 'number', default: 500 },
      code: { type: 'string' },
      message: { type: 'string' },
    },
  },
};

export const getAllTaskSchema = {
  response: {
    200: {
      description: 'Successful response with an array of tasks',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          description: { type: 'string' },
          processId: { type: 'integer' },
          workspaceId: { type: 'integer' },
          CustomerId: { type: 'string' },
          status: { type: 'string', enum: ['ToDo', 'InProgress', 'Done'] },
          dueDate: { type: 'string', format: 'date-time' },
        },
      },
    },
    404: {
      description: 'No tasks found',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'No tasks found' },
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

export const getTaskByCustomerIdSchema = {
  params: {
    type: 'object',
    properties: {
      CustomerId: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Successful response with tasks for a specific customer',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          description: { type: 'string' },
          processId: { type: 'integer' },
          workspaceId: { type: 'integer' },
          CustomerId: { type: 'string' },
          status: { type: 'string', enum: ['ToDo', 'InProgress', 'Done'] },
          dueDate: { type: 'string', format: 'date-time' },
        },
      },
    },
    404: {
      description: 'No tasks found for the given customer',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'No tasks found for the given customer' },
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
export const deleteTaskByWorkspaceIdSchema = {
  params: {
    type: 'object',
    properties: {
      workspaceId: { type: 'integer' },
    },
  },
  response: {
    200: {
      description: 'Task deleted successfully',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Task deleted' },
      },
    },
    404: {
      description: 'No tasks found for the given workspace ID',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'No tasks found for the given workspace ID' },
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
