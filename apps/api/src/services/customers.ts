import { Customer, PrismaClient } from '@saas-monorepo/database';
import { createContactPayload } from 'src/types/contact.js';
import { createCustomerPayload, updateCustomerPayload } from 'src/types/customers.js';

import { AbstractServiceOptions } from '../types/services.js';

export class CustomersService {
  prisma: PrismaClient;
  constructor(options: AbstractServiceOptions) {
    this.prisma = options.prisma;
  }
  async getCustomerById(id: string): Promise<Customer | null> {
    try {
      const customer = await this.prisma.customer.findUnique({
        where: { id: id },
      });
      return customer;
    } catch (error) {
      throw new Error(`Could not find customer with ID: ${id}`);
    }
  }
  async getAllCustomers() {
    try {
      const customers = await this.prisma.customer.findMany();
      return customers;
    } catch (error) {
      console.log('Error getting all customers');
      throw error;
    }
  }

  async updateCustomer(id: string, customerData: updateCustomerPayload) {
    try {
      const updatedCustomer = await this.prisma.customer.update({
        where: { id },
        data: {
          name: customerData.name,
          email: customerData.email,
          status: customerData.status,
          onboardingProcessID: customerData.onboardingProcessID,
        },
      });
      return updatedCustomer;
    } catch (error) {
      console.log(error);
      throw new Error(`Could not update customer with ID: ${id}`);
    }
  }

  async deleteCustomer(id: string) {
    try {
      await this.prisma.customer.delete({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      throw new Error(`Could not delete customer with ID: ${id}`);
    }
  }
  async createCustomer(payload: createCustomerPayload) {
    try {
      if (!payload.email) {
        throw new Error('Email is required');
      }
      let customer = await this.prisma.customer.findUnique({
        where: { email: payload.email.toLowerCase() },
        select: {
          email: true,
          name: true,
          status: true,
          organizationId: true,
        },
      });
      if (customer) {
        console.log('customer already exists');
        throw new Error('customer already exist');
      }
      const process = await this.prisma.onboardingProcess.findFirst({
        where: { step: payload.status },
      });
      const processId = process.id;
      const newCustomer = await this.prisma.customer.create({
        data: {
          email: payload.email,
          name: payload.name,
          status: payload.status,
          organizationId: payload.organizationid,
          onboardingProcess: { connect: { id: processId } },
        },
      });
      return newCustomer;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}
export default CustomersService;
