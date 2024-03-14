import { Customer, PrismaClient } from '@saas-monorepo/database';
import { createContactPayload } from 'src/types/contact.js';
import { createCustomerPayload } from 'src/types/customers.js';

import { AbstractServiceOptions } from '../types/services.js';

export class CustomersService {
  prisma: PrismaClient;
  constructor(options: AbstractServiceOptions) {
    this.prisma = options.prisma;
  }
  async getCustomerById(id: string): Promise<Customer | null> {
    try {
      const customer = await this.prisma.customer.findUnique({
        where: { id },
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

  async updateCustomer(id: string, customerData: Partial<Customer>): Promise<Customer | null> {
    try {
      const updatedCustomer = await this.prisma.customer.update({
        where: { id },
        data: customerData,
      });
      return updatedCustomer;
    } catch (error) {
      throw new Error(`Could not update customer with ID: ${id}`);
    }
  }

  async deleteCustomer(id: string): Promise<void> {
    try {
      await this.prisma.customer.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Could not delete customer with ID: ${id}`);
    }
  }
  async createCustomer(payload: createCustomerPayload) {
    try {
      let customer = await this.prisma.customer.findUniqueOrThrow({
        where: { email: payload.email.toLowerCase() },
        select: {
          email: true,
          name: true,
          organizationId: true,
        },
      });
      if (customer) {
        throw new Error('customer already exist');
      }
      await this.prisma.customer.create({
        data: {
          email: payload.email,
          name: payload.name,
          organizationId: payload.organizationid,
        },
      });
    } catch (error) {
      throw new Error('Could not create customer');
    }
  }
}
export default CustomersService;
