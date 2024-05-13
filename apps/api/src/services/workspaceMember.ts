import { PrismaClient } from '@saas-monorepo/database';
import { connect } from 'http2';
import { AbstractServiceOptions } from 'src/types/services.js';
import { Role, UpdateMemberPayload, WorkspaceMemberPayload } from 'src/types/workspaceMember.js';

export class MemberService {
  prisma: PrismaClient;
  constructor(options: AbstractServiceOptions) {
    this.prisma = options.prisma;
  }
  //create function
  async createMember(payload: WorkspaceMemberPayload) {
    try {
      // Prepare data object for creating the member
      const data: any = {
        role: payload.role,
      };

      // Connect workspace if workspaceId is provided
      if (payload.workspaceId) {
        data.workspace = {
          connect: {
            id: parseInt(payload.workspaceId) as number,
          },
        };
      }

      // Connect user if userId is provided
      if (payload.userId) {
        data.user = {
          connect: {
            id: payload.userId,
          },
        };
      }
      const whereClause = {
        userId: payload.userId,
        workspaceId: parseInt(payload.workspaceId) as number,
      };

      // Check if the member already exists based on userId and workspaceId
      const existingMember = await this.prisma.workspaceMember.findFirst({
        where: whereClause,
      });
      if (!existingMember) {
        await this.prisma.workspaceMember.create({
          data,
        });

        return 'Member Created Successfully';
      } else {
        // Member already exists
        return 'Member already exists';
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error creating member');
    }
  }

  //update function
  async updateMember(id: number, payload: UpdateMemberPayload) {
    try {
      const member = await this.prisma.workspaceMember.findUnique({
        where: { id },
      });
      if (!member) {
        throw new Error(`Member with ID ${id} not found`);
      }

      const updatedMemberData: {
        role?: Role;
        userId?: string;
        workspaceId?: number;
      } = {};

      if (payload.role) {
        updatedMemberData.role = payload.role;
      }
      if (payload.userId) {
        updatedMemberData.userId = payload.userId;
      }
      if (payload.workspaceId) {
        updatedMemberData.workspaceId = payload.workspaceId;
      }

      const updatedMember = await this.prisma.workspaceMember.update({
        where: { id },
        data: updatedMemberData,
      });

      return updatedMember;
    } catch (error) {
      throw new Error(`Could not update member with ID: ${id}`);
    }
  }
  //delete function
  async deleteMember(id: number) {
    try {
      const member = await this.prisma.workspaceMember.findUnique({
        where: { id },
      });

      if (!member) {
        throw new Error(`Member with ID ${id} not found`);
      }

      await this.prisma.workspaceMember.delete({
        where: { id },
      });

      return { message: 'Member deleted successfully' };
    } catch (error) {
      throw new Error(`Could not delete member with ID: ${id}`);
    }
  }
  //fetch all function
  async getAllMembers() {
    try {
      const members = await this.prisma.workspaceMember.findMany({
        include: {
          user: true,
          workspace: true,
        },
      });
      return members;
    } catch (error) {
      console.log('Error in getting all Members:', error);
      throw new Error('Error in getting all Members');
    }
  }
  //fetch by id function
  async getMemberById(id: number) {
    try {
      let member = await this.prisma.workspaceMember.findUnique({
        where: { id },
        include: {
          user: true,
          workspace: true,
        },
      });
      if (!member) {
        throw new Error('This member does not exist!');
      }
      return member;
    } catch (error) {
      console.log('Error in getting the member by Id');
      throw new Error('Error in getting the member by Id');
    }
  }
  //fetch member by workspace
  async getMembersByWorkspace(workspaceId: number) {
    try {
      const members = await this.prisma.workspaceMember.findMany({
        where: {
          workspaceId: workspaceId,
        },
        include: {
          user: true,
          workspace: true,
        },
      });
      return members;
    } catch (error) {
      console.log(`Error fetching members for workspace ID ${workspaceId}`);
      throw new Error(`Error fetching members for workspace ID ${workspaceId}`);
    }
  }
  //delete member by Workspace
  async deleteMembersByWorkspace(workspaceId: number) {
    try {
      await this.prisma.workspaceMember.deleteMany({
        where: {
          workspaceId: workspaceId,
        },
      });
      return { message: `Members for workspace with ID ${workspaceId} deleted successfully` };
    } catch (error) {
      console.log(`Error deleting members for workspace ID ${workspaceId}`);
      throw new Error(`Error deleting members for workspace ID ${workspaceId}`);
    }
  }
}
