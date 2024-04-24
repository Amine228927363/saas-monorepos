import api from '@/services/api'
import type { ServerError } from '@/types/server'
import type { User } from '@/types/users'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user-store',
  state: () => ({
    currentUser: null as User | null,
    isLoading: false,
    error: null as ServerError | null
  }),
  getters: {
    isAdmin(): boolean {
      return true
    }
  },
  actions: {
    async hydrate() {
      this.isLoading = true
      try {
        const res = await api.get('/users/me')
        this.currentUser = res.data.user
      } catch (err: any) {
        this.error = err?.response?.data
      }
      this.isLoading = false
    },
    async dehydrate() {
      this.$reset()
    },
    async getUserName() {
      this.isLoading = true
      try {
        const res = await api.get('/users/me')
        const name = res.data.full_name
        console.log(name)
        return name
      } catch (err: any) {
        console.log(err.message)
        throw new Error(err.message)
      }
    }
  }
})
