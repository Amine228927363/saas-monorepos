import api from '@/services/api'
import { defineStore } from 'pinia'
import type { task } from '@/types/task'
import type { ServerError } from '@/types/server'

export const useTaskStore = defineStore({
  id: 'task-store',
  state: () => ({
    tasks: [] as task[],
    isLoading: false,
    error: null as ServerError | null
  }),
  actions: {
    async createTask(newTask: task) {
      this.isLoading = true
      try {
        const res = await api.post('/tasks/createTask', newTask)
        this.tasks.push(res.data.task)
      } catch (err: any) {
        this.error = err?.response?.data
      }
      this.isLoading = false
    },
    async getAllTasks() {
      this.isLoading = true
      try {
        const response = await api.get('/tasks/tasks')
        this.tasks = response.data
        return response.data
      } catch (error) {
        console.error('Error fetching tasks:', error)

        throw new Error('Unable to fetch tasks')
      } finally {
        this.isLoading = false
      }
    },
    async getTasksByCustomerId(customerId: string): Promise<task[]> {
      this.isLoading = true
      try {
        const response = await api.get(`/tasks/customer/${customerId}`)
        return response.data
      } catch (error) {
        console.error('Error fetching tasks by customer ID:', error)
        throw new Error('Unable to fetch tasks by customer ID')
      } finally {
        this.isLoading = false
      }
    }
  }
})
