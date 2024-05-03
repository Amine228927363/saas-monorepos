import api from '@/services/api'
import { defineStore } from 'pinia'
import type { createMember, workspaceMember } from '@/types/workspaceMember'
import type { ServerError } from '@/types/server'

export const useMemberStore = defineStore({
  id: 'member-store',
  state: () => ({
    members: [] as workspaceMember[],
    isLoading: false,
    error: null as ServerError | null
  }),
  getters: {
    totalMembers(): number {
      return this.members.length
    },
    loading(): boolean {
      return this.isLoading
    }
  },

  actions: {
    async createMember(newMember: createMember) {
      this.isLoading = true
      try {
        const res = await api.post('/members/createMember', newMember)
        this.members.push(res.data)
      } catch (err: any) {
        console.error(err)
        this.error = err?.response?.data
      } finally {
        this.isLoading = false
      }
    },
    async getMembers() {
      this.isLoading = true
      try {
        const response = await api.get('/members/allMembers')
        this.members = response.data
        console.log(this.members)
      } catch (error) {
        console.error('Error fetching members:', error)
        throw new Error('Unable to fetch members')
      } finally {
        this.isLoading = false
      }
    },
    async deleteMember(id: number) {
      try {
        await api.delete(`/members/deleteMember/${id}`)
        this.members = this.members.filter((member) => member.id !== id)
      } catch (e) {
        console.error('Error deleting member:', e)
        throw new Error('Unable to delete member')
      }
    },
    async getMemberById(id: string) {
      try {
        const res = await api.get(`/members/member/${id}`)
        if (!res.data) {
          throw new Error('No Member Found')
        }
        return res
      } catch (err) {
        console.error('Error fetching member:', err)
        throw err
      }
    },
    async getMembersByWorkspace(workspaceId: number) {
      try {
        const response = await api.get(`/members/members/workspace/${workspaceId}`)
        this.members = response.data
      } catch (error) {
        console.error('Error fetching members by workspace:', error)
        throw error
      }
    },
    async deleteMembersByWorkspace(workspaceId: number) {
      try {
        await api.delete(`/members/deleteMembers/workspace/${workspaceId}`)
        this.members = this.members.filter((member) => member.workspace.id !== workspaceId)
      } catch (error) {
        console.error('Error deleting members by workspace:', error)
        throw new Error('Unable to delete members by workspace')
      }
    }
  }
})
