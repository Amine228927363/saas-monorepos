import api from '@/services/api'
import { defineStore } from 'pinia'
import type { Workspace, createWorkspace } from '@/types/Workspace'
import type { ServerError } from '@/types/server'
export const useWorkspaceStore = defineStore({
  id: 'workspace-store',
  state: () => ({
    workspaces: [] as Workspace[],
    isLoading: false,
    error: null as ServerError | null
  }),
  actions: {
    async createWorkspace(newWorkspace: createWorkspace) {
      this.isLoading = true
      try {
        const res = await api.post('/workspaces/createWorkspace', newWorkspace)
        return res.data
      } catch (err) {
        console.log('error creating workspace')
      }
    },
    async getAllWorkspaces() {
      this.isLoading = true
      try {
        const response = await api.get('/workspaces/workspaces')
        this.workspaces = response.data
      } catch (error) {
        console.error('Error fetching workspaces:', error)
        throw new Error('Unable to fetch workspaces')
      } finally {
        this.isLoading = false
      }
    },
    async deleteWorkspace(workspaceId: number) {
      this.isLoading = true
      try {
        const res = await api.delete(`/workspaces/deleteWorkspace/${workspaceId}`)
        this.workspaces = this.workspaces.filter((workspace) => workspace.id !== workspaceId)
      } catch (err: any) {
        console.log(err)
        this.error = err?.response?.data
      }
      this.isLoading = false
    },
    async updateWorkspace(workspaceId: number, updatedWorkspace: createWorkspace) {
      this.isLoading = true
      try {
        const res = await api.put(`/workspaces/updateWorkspace/${workspaceId}`, updatedWorkspace)
        const index = this.workspaces.findIndex((workspace) => workspace.id === workspaceId)
      } catch (err: any) {
        console.log(err)
        this.error = err?.response?.data
      }
      this.isLoading = false
    }
  }
})
