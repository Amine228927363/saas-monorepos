import { defineStore } from 'pinia'
import api from '@/services/api'
import type { User } from '@/types'
import type { contactRequest } from '@/types/email'
export const useEmailStore = defineStore({
  id: 'email-store',
  actions: {
    async sendEmail(user: User) {
      try {
        const response = await api.post('/emails/sendEmail', user)
        console.log('Email sent successfully:', response.data)
      } catch (error) {
        console.error('Error sending welcome email:', error)
        throw new Error('Unable to send welcome email')
      }
    },
    async contactCustomer(contactRequest: contactRequest) {
      try {
        const response = await api.post('/emails/contactCustomer', contactRequest)
        console.log('Contact request sent successfully:', response.data)
      } catch (error) {
        console.error('Error sending contact request:', error)
        throw new Error('Unable to send contact request')
      }
    }
  }
})
