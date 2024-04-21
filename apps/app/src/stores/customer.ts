import api from '@/services/api'
import { defineStore } from 'pinia'
import type { Customer } from '@/types/customer'
import type { ServerError } from '@/types/server'
export const useCustomerStore = defineStore({
  id: 'cust-store',
  state: () => ({
    customers: [] as Customer[],
    isLoading: false,
    error: null as ServerError | null
  }),
  getters: {
    totalCustomers(): number {
      return this.customers.length
    },
    customersByStatus(): Record<string, Customer[]> {
      const customersByStatus: Record<string, Customer[]> = {}
      this.customers.forEach((customer) => {
        if (!customersByStatus[customer.status]) {
          customersByStatus[customer.status] = []
        }
        customersByStatus[customer.status].push(customer)
      })

      return customersByStatus
    },
    newCustomersThisWeek(): number {
      const today = new Date()
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      return this.customers.filter((customer) => {
        const customerCreatedAt = new Date(customer.createdAt)
        console.log(customerCreatedAt)
        return customerCreatedAt >= oneWeekAgo
      }).length
    },
    loading(): boolean {
      return this.isLoading
    }
  },

  actions: {
    async createCustomer(newCustomer: Customer) {
      this.isLoading = true
      try {
        const res = await api.post('/customers/createCustomer', newCustomer)
        this.customers.push(res.data)
      } catch (err: any) {
        console.log(err)
        this.error = err?.response?.data
      }
      this.isLoading = false
    },
    //get customers
    async getCustomers() {
      this.isLoading = true
      try {
        const response = await api.get('/customers/allCustomers')
        this.customers = response.data
        return response.data
      } catch (error) {
        console.error('Error fetching customers:', error)
        throw new Error('Unable to fetch customers')
      } finally {
        this.isLoading = false
      }
    },
    async updateCustomer(id: string, newStatus: string, processId: number) {
      try {
        const response = await api.put(`/customers/updateCustomer/${id}`, {
          status: newStatus,
          onboardingProcessID: processId
        })
        return response.data
      } catch (error) {
        console.error('Error updating customer:', error)
        throw new Error('Unable to update customer')
      }
    },
    async updateCustomerById(id: string, payload: Customer) {
      try {
        const updatedFields: any = {}
        if (payload.name !== undefined) {
          updatedFields.name = payload.name
        }
        if (payload.email !== undefined) {
          updatedFields.email = payload.email
        }
        if (payload.organization !== undefined) {
          updatedFields.organization = payload.organization
        }
        if (Object.keys(updatedFields).length === 0) {
          console.log('No fields to update.')
          return null
        }
        const response = await api.put(`/customers/updateCustomer/${id}`, updatedFields)
        return response.data
      } catch (error) {
        console.error('Error updating customer:', error)
        throw new Error('Unable to update customer')
      }
    },

    async deleteCustomer(id: string) {
      try {
        await api.delete(`/customers/deleteCustomer/${id}`)
        this.customers = this.customers.filter((cust) => cust.id !== id)
      } catch (e) {
        console.error('Error deleting customer:', e)
        throw new Error('Unable to delete customer')
      }
    },
    async getCustomerById(id: string) {
      try {
        const res = await api.get(`/customers/customer/${id}`)
        if (!res.data) {
          throw new Error('No Customer Found')
        }
        return res
      } catch (err) {
        console.error('Error fetching customer:', err)
        throw err
      }
    }
  }
})
