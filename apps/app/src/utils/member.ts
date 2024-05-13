import api from '../services/api'

export const fetchUserDetailsByEmail = async (
  email: string,
  authToken: string
): Promise<{ full_name: string; id: string } | null> => {
  try {
    const response = await api.get(`/users/userByEmail/${email}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    })

    if (!response || !response.data) {
      throw new Error('Failed to fetch user details')
    }

    const userData = response.data
    const { full_name, id } = userData
    return { full_name, id }
  } catch (error) {
    console.error('Error fetching user details:', error)
    return null
  }
}
