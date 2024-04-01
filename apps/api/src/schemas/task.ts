export const taskSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    description: { type: 'string' },
    assignedTo: { type: 'string' },
    processId: { type: 'string' },
    completed: { type: 'boolean' },
    userId: { type: 'string' },
  },
  required: ['name', 'description', 'userId'],
};
//create task schema
export const createTaskSchema = {
  tags: ['tasks'],
  body: {
    type: 'object',

    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      processId: { type: 'integer' },
      assignedTo: { type: 'string' },
      CustomerId: { type: 'string' },
    },
    required: ['name', 'processId'],
  },
  response: {
    201: {
      description: 'Task created successfully',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        description: { type: 'string' },
        processId: { type: 'integer' },
        assignedTo: { type: 'string' },
        customerId: { type: 'string' },
        completed: { type: 'boolean' },
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
//update task by id
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
      processId: { type: 'integer' },
      assignedTo: { type: 'string' },
      CustomerId: { type: 'string' },
      completed: { type: 'boolean' },
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
        assignedTo: { type: 'string' },
        CustomerId: { type: 'string' },
        completed: { type: 'boolean' },
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
//delete task
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
//get all tasks
export const getAllTaskSchema = {
  response: {
    200: {
      description: 'Successful response with an array of tasks',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          description: { type: 'string' },
          processId: { type: 'integer' },
          assignedTo: { type: 'string' },
          CustomerId: { type: 'string' },
          completed: { type: 'boolean' },
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
// getTaskByCustomerId schema
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
          id: { type: 'number' },
          name: { type: 'string' },
          description: { type: 'string' },
          processId: { type: 'integer' },
          assignedTo: { type: 'string' },
          CustomerId: { type: 'string' },
          completed: { type: 'boolean' },
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
