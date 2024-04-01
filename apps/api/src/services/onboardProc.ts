import { Prisma, PrismaClient, User } from '@saas-monorepo/database';
import { createOnbordProc, updateOnboardProc } from 'src/types/onboardingProcess.js';

import { AbstractServiceOptions } from '../types/services.js';

export class OnboardingServices {
  prisma: PrismaClient;
  constructor(options: AbstractServiceOptions) {
    this.prisma = options.prisma;
  }
  async createOnboardProc(payload: createOnbordProc) {
    try {
      const onboardingProcess = await this.prisma.onboardingProcess.create({
        data: {
          step: payload.step,
          completed: false,
          dueDate: payload.dueDate,
        },
      });

      return onboardingProcess;
    } catch (error) {
      console.error('Error creating onboarding process:', error);
      throw new Error('Could not create onboarding process');
    }
  }

  async updateOnboardProc(id: string, payload: updateOnboardProc) {
    try {
      const existingOnboardingProcess = await this.prisma.onboardingProcess.findUnique({
        where: { id: parseInt(id) },
      });

      if (!existingOnboardingProcess) {
        throw new Error('Onboarding process not found');
      }

      const updatedOnboardingProcess = await this.prisma.onboardingProcess.update({
        where: { id: parseInt(id) },
        data: {
          step: payload.step,
          completed: payload.completed,
          dueDate: payload.dueDate,
        },
      });

      return updatedOnboardingProcess;
    } catch (error) {
      throw new Error('Could not update onboarding process');
    }
  }

  async deleteOnboardProc(id: string) {
    try {
      const existingOnboardingProcess = await this.prisma.onboardingProcess.findUnique({
        where: { id: parseInt(id) },
      });

      if (!existingOnboardingProcess) {
        throw new Error('Onboarding process not found');
      }

      await this.prisma.onboardingProcess.delete({
        where: { id: parseInt(id) },
      });

      return existingOnboardingProcess;
    } catch (error) {
      throw new Error('Could not delete onboarding process');
    }
  }
}
