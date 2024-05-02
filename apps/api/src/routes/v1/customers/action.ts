import { FastifyPluginAsync } from 'fastify';
import { createCustomerPayload, updateCustomerPayload } from 'src/types/customers.js';

import {
  createCustomerSchema,
  deleteCustomerSchema,
  deleteCustomersByWorkspaceSchema,
  getAllCustomersSchema,
  getCustomerByIdSchema,
  getCustomersByWorkspaceSchema,
  updateCustomerSchema,
} from '../../../schemas/customer.js';
import { CustomersService } from '../../../services/customers.js';

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const { prisma } = fastify;
  const customersService = new CustomersService({ prisma });

  fastify.get<{ Params: { id: string } }>(
    '/customer/:id',
    { schema: getCustomerByIdSchema },
    async (request, reply) => {
      const customerId = request.params.id;

      if (!customerId) {
        return reply.status(400).send('Invalid id');
      }

      try {
        const customer = await customersService.getCustomerById(customerId);
        if (!customer) {
          return reply.status(404).send(`Customer with the id ${customerId} was not found`);
        }
        return reply.status(200).send(customer);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('Internal Server Error');
      }
    },
  );

  fastify.post<{ Body: createCustomerPayload }>(
    '/createCustomer',
    { schema: createCustomerSchema },
    async (request, reply) => {
      try {
        const customer = await customersService.createCustomer(request.body);
        return reply.status(200).send(customer);
      } catch (error) {
        fastify.log.error(error);
        console.log(error);
        return reply.status(500).send('Internal Server Error');
      }
    },
  );

  fastify.get('/allCustomers', { schema: getAllCustomersSchema }, async (request, reply) => {
    try {
      const customers = await customersService.getAllCustomers();
      return reply.status(200).send(customers);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send('Internal Server Error');
    }
  });

  fastify.put<{ Params: { id: string } }>(
    '/updateCustomer/:id',
    { schema: updateCustomerSchema },
    async (request, reply) => {
      const customerId = request.params.id;
      const body: updateCustomerPayload = request.body as updateCustomerPayload;

      if (!customerId) {
        return reply.status(400).send('Invalid id');
      }

      try {
        const updatedCustomer = await customersService.updateCustomer(customerId, body);
        if (!updatedCustomer) {
          return reply.status(404).send(`Customer with the id ${customerId} was not found`);
        }
        return reply.status(200).send(updatedCustomer);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('Internal Server Error');
      }
    },
  );

  fastify.delete<{ Params: { id: string } }>(
    '/deleteCustomer/:id',
    { schema: deleteCustomerSchema },
    async (request, reply) => {
      const customerId = request.params.id;
      try {
        await customersService.deleteCustomer(customerId);
        return reply.send(`Customer with the id ${customerId} was deleted`);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('Internal Server Error');
      }
    },
  );
  fastify.get<{ Params: { workspaceId: string } }>(
    '/customers/workspace/:workspaceId',
    { schema: getCustomersByWorkspaceSchema },
    async (request, reply) => {
      const workspaceId = request.params.workspaceId;

      if (!workspaceId) {
        return reply.status(400).send('Invalid workspaceId');
      }

      try {
        const customers = await customersService.getCustomersByWorkspace(parseInt(workspaceId, 10));
        return reply.status(200).send(customers);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('Internal Server Error');
      }
    },
  );

  fastify.delete<{ Params: { workspaceId: string } }>(
    '/deleteCustomers/workspace/:workspaceId',
    { schema: deleteCustomersByWorkspaceSchema },
    async (request, reply) => {
      const workspaceId = request.params.workspaceId;

      if (!workspaceId) {
        return reply.status(400).send('Invalid workspaceId');
      }

      try {
        await customersService.deleteCustomersByWorkspace(parseInt(workspaceId, 10));
        return reply.send(`Customers for workspace with id ${workspaceId} were deleted`);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('Internal Server Error');
      }
    },
  );
};

export default routes;
