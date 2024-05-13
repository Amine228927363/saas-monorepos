import md5 from 'md5'
import api from '@/services/api'
import type { workspaceMember } from '@/types/workspaceMember'

export const generateUniqueLink = async (role: string, workspaceId: number, email: string) => {
  const tokenPayload = {
    email,
    role,
    workspaceId
  }
  try {
    const tokenResponse = await api.post('/token/generateToken', tokenPayload)
    const token = tokenResponse.data
    console.log(token, typeof token)
    return `http://localhost:5173/confirmation/${token}`.toString()
  } catch (error) {
    console.error('Error generating unique link:', error)
    throw new Error('Unable to generate unique link')
  }
}

export const verifyToken = async (token: string): Promise<workspaceMember | null> => {
  if (!token) {
    throw new Error('Missing required token')
  }

  const url = `/verifyToken?token=${token}`

  try {
    const response = await fetch(url)
    console.log(response)
    if (!response.ok) {
      console.error('Failed to verify token')
      return null
    }
    const data = await response
    console.log('Token verified successfully')
    return data
  } catch (error) {
    console.error('Error verifying token:', error)
    return null
  }
}
