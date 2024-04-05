import { FastifyPluginAsync } from 'fastify';
import {
  createOnboardingProcessSchema,
  deleteOnboardSchema,
  getAllOnboardsSchema,
  getOnboardingProcessByIdSchema,
  getOnboardingProcessByStepSchema,
  updateOnboardingProcessSchema,
} from 'src/schemas/onboardProc.js';
import { OnboardingServices } from 'src/services/onboardProc.js';
import { createOnbordProc, updateOnboardProc } from 'src/types/onboardingProcess.js';

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const { prisma } = fastify;
  const onboardService = new OnboardingServices({ prisma });
  //create onboarding process
  fastify.post<{ Body: createOnbordProc }>(
    '/createOnboardProc',
    {
      schema: createOnboardingProcessSchema,
    },
    async (request, reply) => {
      try {
        const onboard = await onboardService.createOnboardProc(request.body);
        console.log('onboarding created!');
        reply.send(onboard);
      } catch (err) {
        reply.status(400).send('error creating onboarding process');
      }
    },
  );
  //update onboarding process
  fastify.put<{ Params: { id: string }; Body: updateOnboardProc }>(
    '/updateOnboard/:id',
    {
      schema: updateOnboardingProcessSchema,
    },
    async (request, reply) => {
      try {
        const id = request.params.id;
        const updatedOnboard = await onboardService.updateOnboardProc(id, request.body);
        if (!updatedOnboard) {
          return reply.status(404).send('Onboarding process not found');
        }
        return reply.send('Onboarding process updated successfully');
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('Internal Server Error');
      }
    },
  );

  fastify.delete<{ Params: { id: string } }>(
    '/deleteOnboard/:id',
    { schema: deleteOnboardSchema },
    async (request, reply) => {
      try {
        const deletedOnboard = await onboardService.deleteOnboardProc(request.params.id);
        if (!deletedOnboard) {
          return reply.status(404).send('Onboarding process not found');
        }
        return reply.send('Onboarding process deleted successfully');
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('Internal Server Error');
      }
    },
  );
  fastify.get<{ Params: {} }>(
    '/getAllOnboard',
    { schema: getAllOnboardsSchema },
    async (request, reply) => {
      try {
        const allOnboards = await onboardService.getAllOnboardProcs();
        return reply.send(allOnboards);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('Server error');
      }
    },
  );
  // Get Onboard by ID
  fastify.get<{ Params: { id: string } }>(
    '/getOnboardById/:id',
    { schema: getOnboardingProcessByIdSchema },
    async (request, reply) => {
      try {
        const onboardId = request.params.id;
        const onboard = await onboardService.getOnboardById(onboardId);
        if (!onboard) {
          return reply.status(404).send('Onboarding process not found');
        }
        return reply.send(onboard);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('Internal Server Error');
      }
    },
  );
  // Get Onboard by Step
  fastify.get<{ Params: { step: string } }>(
    '/getOnboardByStep/:step',
    { schema: getOnboardingProcessByStepSchema },
    async (request, reply) => {
      try {
        const step = request.params.step;
        const onboard = await onboardService.getOnboardByStep(step);
        if (!onboard) {
          return reply.status(404).send('Onboarding process not found');
        }
        return reply.send(onboard);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send('Internal Server Error');
      }
    },
  );
};
export default routes;
