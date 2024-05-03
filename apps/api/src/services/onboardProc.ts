import { Prisma, PrismaClient, User } from '@saas-monorepo/database';
import { createOnbordProc, updateOnboardProc } from 'src/types/onboardingProcess.js';

import { AbstractServiceOptions } from '../types/services.js';

export class OnboardingServices {
  prisma: PrismaClient;
  constructor(options: AbstractServiceOptions) {
    this.prisma = options.prisma;
  }
  async getNextOnboardingProcessId(): Promise<number> {
    const latestProcess = await this.prisma.onboardingProcess.findFirst({
      orderBy: { id: 'desc' },
    });

    if (latestProcess) {
      return latestProcess.id + 1;
    } else {
      return 1;
    }
  }
  async createOnboardProc(payload: createOnbordProc) {
    try {
      const existingProcess = await this.prisma.onboardingProcess.findFirst({
        where: { step: payload.step },
      });
      if (existingProcess) {
        console.error('Error creating onboarding process: Process with this name already exists');
        throw new Error('Onboarding process with this name already exists');
      }
      const nextId = await this.getNextOnboardingProcessId();
      const onboardingProcess = await this.prisma.onboardingProcess.create({
        data: {
          id: nextId,
          step: payload.step,
        },
      });
      if (!onboardingProcess) {
        console.error('Error creating onboarding process: Process not created');
        throw new Error('Could not create onboarding process');
      }
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
  async getAllOnboardProcs(): Promise<any[]> {
    try {
      const allOnboardingProcesses = await this.prisma.onboardingProcess.findMany();
      return allOnboardingProcesses;
    } catch (error) {
      console.error('Error fetching all onboarding processes:', error);
      throw new Error('Could not fetch all onboarding processes');
    }
  }
  async getOnboardById(id: string) {
    try {
      const onboardingProcess = await this.prisma.onboardingProcess.findUnique({
        where: { id: parseInt(id) },
      });

      if (!onboardingProcess) {
        throw new Error('Onboarding process not found');
      }

      return onboardingProcess;
    } catch (error) {
      throw new Error('Could not get onboarding process by ID');
    }
  }
  async getOnboardByStep(step: string) {
    try {
      const onboardingProcess = await this.prisma.onboardingProcess.findFirst({
        where: { step },
      });

      if (!onboardingProcess) {
        throw new Error('Onboarding process not found');
      }

      return onboardingProcess;
    } catch (error) {
      console.log(error);
      throw new Error('Could not get onboarding process by step');
    }
  }
}
