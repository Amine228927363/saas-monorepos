import api from '@/services/api'
import { defineStore } from 'pinia'
import type { onboardingProc, onboardProcPayload } from '@/types/onboardingProc'
import type { ServerError } from '@/types/server'

export const useOnboardingProcStore = defineStore({
  id: 'onboardingProc-store',
  state: () => ({
    onboardingProcs: [] as onboardingProc[],
    isLoading: false,
    error: null as ServerError | null
  }),
  actions: {
    async createOnboardingProc(newOnboardingProc: onboardProcPayload) {
      this.isLoading = true
      try {
        const res = await api.post('/onboardingProcess/createOnboardProc', newOnboardingProc)
        console.log('API Response:', res.data)
        if (res && res.data) {
          this.onboardingProcs.push(res.data)
          return res
        } else {
          console.error('Error creating onboarding process: Invalid response data')
          return null
        }
      } catch (err: any) {
        this.error = err?.response?.data
        return null
      } finally {
        this.isLoading = false
      }
    },

    async getAllOnboardingProcs() {
      this.isLoading = true
      try {
        const response = await api.get('/onboardingProcess/getAllOnboard')
        this.onboardingProcs = response.data
        return response.data
      } catch (error) {
        console.error('Error fetching onboarding processes:', error)
        throw new Error('Unable to fetch onboarding processes')
      } finally {
        this.isLoading = false
      }
    },
    async getProcsByCustomerId(customerId: string): Promise<onboardingProc[]> {
      this.isLoading = true
      try {
        const response = await api.get(`/onboardingProcs/customer/${customerId}`)
        return response.data
      } catch (error) {
        console.error('Error fetching onboarding processes by customer ID:', error)
        throw new Error('Unable to fetch onboarding processes by customer ID')
      } finally {
        this.isLoading = false
      }
    },
    async deleteOnboardProc(id: number) {
      this.isLoading = true
      try {
        await api.delete(`/onboardingProcess/deleteOnboard/${id}`)
        this.onboardingProcs = this.onboardingProcs.filter((proc) => proc.id !== id)
      } catch (error) {
        console.error('Error deleting onboarding process:', error)
        throw new Error('Unable to delete onboarding process')
      } finally {
        this.isLoading = false
      }
    },
    async getOnboardByStep(newStep: string) {
      try {
        const response = await api.get(`/onboardingProcess/getOnboardByStep/${newStep}`)
        return response.data
      } catch (error) {
        console.error('Error fetching onboard process id:', error)
        throw new Error('Unable to fetch onboard process id')
      }
    },
    async getOnboardById(id: number) {
      try {
        const response = await api.get(`/onboardingProcess/getOnboardById/${id}`)
        return response.data
      } catch (error) {
        console.error('Error fetching onboard process id:', error)
        throw new Error('Unable to fetch onboard process id')
      }
    }
  }
})
