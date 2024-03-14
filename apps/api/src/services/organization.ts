import { PrismaClient } from '@saas-monorepo/database';
import { error } from 'console';
import { createOrganization, updateOrganization } from 'src/types/organization.js';
import { AbstractServiceOptions } from 'src/types/services.js';

export class organizationServices {
  prisma: PrismaClient;
  constructor(options: AbstractServiceOptions) {
    this.prisma = options.prisma;
  }
  async createOrg(payload: createOrganization) {
    try {
      let org = await this.prisma.organization.findUnique({
        where: { email: payload.email },
        select: {
          id: true,
          name: true,
          phone: true,
          customers: true,
        },
      });
      if (org) {
        throw new Error('organization already exist ');
      }
      await this.prisma.organization.create({
        data: {
          email: payload.email,
          name: payload.name,
          phone: payload.phone,
          customers: {
            connect: { id: payload.customers },
          },
        },
      });
    } catch (error) {
      throw new Error('Could not create organization');
    }
  }
  //update organization
  async updateOrg(id: string, payload: updateOrganization) {
    try {
      const org = await this.prisma.organization.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          customers: true,
        },
      });

      if (!org) {
        throw new Error('Organization not found');
      }

      const updatedOrganization = await this.prisma.organization.update({
        where: { id },
        data: {
          email: payload.email,
          name: payload.name,
          phone: payload.phone,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          customers: true,
        },
      });

      return updatedOrganization;
    } catch (error) {
      throw new Error('Could not update organization');
    }
  }

  //delete organization
  async deleteOrganization(id: string) {
    try {
      let org = await this.prisma.organization.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
      if (!org) {
        throw new Error('Could not find organization');
      }
      await this.prisma.organization.delete({ where: { id } });
      //return the deleted
      return org;
    } catch (error) {
      console.error('Could not delete organization');
      throw error;
    }
  }
}
export default organizationServices;
