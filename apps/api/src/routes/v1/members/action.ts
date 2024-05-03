import { FastifyPluginAsync } from 'fastify';
import {
  createMemberSchema,
  deleteMemberSchema,
  deleteMembersByWorkspaceSchema,
  getAllMembersSchema,
  getMemberByIdSchema,
  getMembersByWorkspaceSchema,
  updateMemberSchema,
} from 'src/schemas/workspaceMember.js';
import { MemberService } from 'src/services/workspaceMember.js';
import { UpdateMemberPayload, WorkspaceMemberPayload } from 'src/types/workspaceMember.js';

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const { prisma } = fastify;
  const memberService = new MemberService({ prisma });

  fastify.get<{ Params: { id: number } }>(
    '/member/:id',
    { schema: getMemberByIdSchema },
    async (request, reply) => {
      const memberId = request.params.id;
      if (!memberId) {
        return reply.status(400).send('Invalid id');
      }
      try {
        const member = await memberService.getMemberById(memberId);
        if (!member) {
          return reply.status(404).send(`Member with the id ${memberId} was not found`);
        }
        return reply.status(200).send(member);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('Internal Server Error');
      }
    },
  );

  fastify.post<{ Body: WorkspaceMemberPayload }>(
    '/createMember',
    { schema: createMemberSchema },
    async (request, reply) => {
      try {
        const member = await memberService.createMember(request.body);
        return reply.status(200).send(member);
      } catch (error) {
        fastify.log.error(error);
        console.log(error);
        return reply.status(500).send('Internal Server Error');
      }
    },
  );

  fastify.get('/allMembers', { schema: getAllMembersSchema }, async (request, reply) => {
    try {
      const members = await memberService.getAllMembers();
      return reply.status(200).send(members);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send('Internal Server Error');
    }
  });

  fastify.put<{ Params: { id: number } }>(
    '/updateMember/:id',
    { schema: updateMemberSchema },
    async (request, reply) => {
      const memberId = request.params.id;
      const body: UpdateMemberPayload = request.body as UpdateMemberPayload;

      if (!memberId) {
        return reply.status(400).send('Invalid id');
      }
      try {
        const updatedMember = await memberService.updateMember(memberId, body);
        if (!updatedMember) {
          return reply.status(404).send(`Member with the id ${memberId} was not found`);
        }
        return reply.status(200).send(updatedMember);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('Internal Server Error');
      }
    },
  );

  fastify.delete<{ Params: { id: number } }>(
    '/deleteMember/:id',
    { schema: deleteMemberSchema },
    async (request, reply) => {
      const memberId = request.params.id;
      try {
        await memberService.deleteMember(memberId);
        return reply.send(`Member with the id ${memberId} was deleted`);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('Internal Server Error');
      }
    },
  );

  fastify.get<{ Params: { workspaceId: string } }>(
    '/members/workspace/:workspaceId',
    { schema: getMembersByWorkspaceSchema },
    async (request, reply) => {
      const workspaceId = request.params.workspaceId;

      if (!workspaceId) {
        return reply.status(400).send('Invalid workspaceId');
      }

      try {
        const members = await memberService.getMembersByWorkspace(parseInt(workspaceId, 10));
        return reply.status(200).send(members);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('Internal Server Error');
      }
    },
  );

  fastify.delete<{ Params: { workspaceId: string } }>(
    '/deleteMembers/workspace/:workspaceId',
    { schema: deleteMembersByWorkspaceSchema },
    async (request, reply) => {
      const workspaceId = request.params.workspaceId;

      if (!workspaceId) {
        return reply.status(400).send('Invalid workspaceId');
      }

      try {
        await memberService.deleteMembersByWorkspace(parseInt(workspaceId, 10));
        return reply.send(`Members for workspace with id ${workspaceId} were deleted`);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('Internal Server Error');
      }
    },
  );
};

export default routes;
