export const taskSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    name: { type: 'string' },
    description: { type: 'string' },
    processId: { type: 'number', format: 'int64' },
    completed: { type: 'boolean' },
    userId: { type: 'string', format: 'uuid' },
  },
  required: ['name', 'description', 'dueDate', 'userId'],
};
