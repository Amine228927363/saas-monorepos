import { Prisma, PrismaClient, User } from '@saas-monorepo/database';
import { error } from 'node:console';
import {
  GetUserByIdPayload,
  deleteUserByIdPayload,
  getAllUsersPayload,
  updateUserPayload,
} from 'src/types/users.js';

import { AbstractServiceOptions } from '../types/services.js';

export class UsersService {
  prisma: PrismaClient;
  constructor(options: AbstractServiceOptions) {
    this.prisma = options.prisma;
  }
  async getLoggedUserData(id: string) {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
    } catch (err: any) {
      throw err;
    }
  }
  async getUser(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('No user found with the provided ID');
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  async getAllUsers() {
    return await this.prisma.user.findMany();
  }
  async deleteUser(userId: string) {
    const deletedUser = await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return deletedUser;
  }
  async updateUser(userId: string, payload: updateUserPayload) {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: payload,
    });
    return updatedUser;
  }
  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      console.error('there is no user with this email');
    }
    return user;
  }
}
