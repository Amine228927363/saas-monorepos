import api from '@/services/api'
import { defineStore } from 'pinia'
import type { task, Status } from '@/types/task'
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
    },
    async updateTaskStatusById(taskId: number, status: string) {
      this.isLoading = true
      try {
        const res = await api.put(`/tasks/updateTask/${taskId}`, { status })
        const updatedTask = this.tasks.find((task) => task.id === taskId)
        if (updatedTask) {
          updatedTask.status = status
        }
      } catch (err: any) {
        console.log(err)
        this.error = err?.response?.data
      }
      this.isLoading = false
    },
    async deleteTaskById(taskId: number) {
      this.isLoading = true
      try {
        const res = await api.delete(`/tasks/deleteTask/${taskId}`)
        this.tasks = this.tasks.filter((task) => task.id !== taskId)
      } catch (err: any) {
        console.log(err)
        this.error = err?.response?.data
      }
      this.isLoading = false
    },
    async validTasks(customerId: string, processId: number) {
      try {
        this.isLoading = true
        const response = await api.get(`/tasks/customer/${customerId}`)
        const tasks = response.data
        const StageTasks = tasks.filter((task: task) => task.processId == processId)
        for (const task of StageTasks) {
          await this.updateTaskStatusById(task.id, 'Done')
        }
        await this.getTasksByCustomerId(customerId)
        console.log('done')
      } catch (error) {
        console.error('Error updating tasks:', error)
        throw new Error('Unable to update tasks')
      } finally {
        this.isLoading = false
      }
    },
    async deleteTasksByWorkspaceId(workspaceId: number) {
      this.isLoading = true
      try {
        const response = await api.delete(`/tasks/deleteTasks/workspace/${workspaceId}`)
        this.tasks = this.tasks.filter((task) => task.workspaceId !== workspaceId)
      } catch (error) {
        console.error('Error deleting tasks by customer ID:', error)
        throw new Error('Unable to delete tasks by customer ID')
      } finally {
        this.isLoading = false
      }
    }
  }
})
