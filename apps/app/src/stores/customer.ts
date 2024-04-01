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
  actions: {
    //vreate customer functon
    async createCustomer(newCustomer: Customer) {
      this.isLoading = true
      try {
        const res = await api.post('/customers/createCustomer', newCustomer)
        this.customers.push(res.data.customer)
      } catch (err: any) {
        this.error = err?.response?.data
      }
      this.isLoading = false
    },
    //get customers
    async getCustomers() {
      try {
        const response = await api.get('/customers/allCustomers')
        this.customers = response.data
        return response.data
      } catch (error) {
        console.error('Error fetching customers:', error)
        throw new Error('Unable to fetch customers')
      }
      this.isLoading = false
    },
    async updateCustomer(id: string, newStatus: string) {
      try {
        const response = await api.put(`/customers/updateCustomer/${id}`, { status: newStatus })
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
        let res = await api.get(`/customers/customer/${id}`)
        if (!res.data) throw new Error('No Customer Found')
        return res.data
      } catch (err) {
        console.log(err)
      }
    }
  }
})
