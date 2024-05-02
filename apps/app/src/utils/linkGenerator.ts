import md5 from 'md5'
export const generateUniqueLink = (role: string, workspaceId: number) => {
  const uniqueId = md5(role)
  return `http://localhost:5173/customer/${workspaceId}`
}
