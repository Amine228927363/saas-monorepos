import { FastifyPluginAsync } from 'fastify';
import { createOrganizationSchema, updateOrganizationSchema } from 'src/schemas/organization.js';
import organizationServices from 'src/services/organization.js';
import { createOrganization, updateOrganization } from 'src/types/organization.js';

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const { prisma } = fastify;
  const orgServices = new organizationServices({ prisma });
  fastify.post<{ Body: createOrganization }>(
    '/createOrg',
    { schema: createOrganizationSchema },
    async (request, reply) => {
      try {
        const org = await orgServices.createOrg(request.body);
        reply.code(201).send('organization created successfully');
        return reply.status(200).send(org);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('Internal Server Error');
      }
    },
  );
  fastify.put<{ Params: { id: string }; Body: updateOrganization }>(
    '/updateOrg',
    { schema: updateOrganizationSchema },
    async (request, reply) => {
      try {
        const org = await orgServices.updateOrg(request.body.id, request.body);
        reply.code(201).send('organization updated successfully');
        return reply.status(200).send(org);
      } catch (error) {
        console.error(error, 'internal server error occurred');
      }
    },
  );
  fastify.delete<{ Params: { id: string } }>(
    '/deleteOrg',
    { schema: updateOrganizationSchema },
    async (request, reply) => {
      try {
        const org = await orgServices.deleteOrganization(request.params.id);
        reply.code(201).send('organization deleted successfully');
        return reply.status(200);
      } catch (error) {
        console.error(error, 'internal server error occurred');
      }
    },
  );
};
export default routes;
