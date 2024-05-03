import type { Workspace } from './Workspace'
import type { User } from './users'

export type workspaceMember = {
  id: number
  role: Role
  user: User
  workspace: Workspace
}
export enum Role {
  Editor = 'Editor',
  Viewer = 'Viewer'
}
export type createMember = {
  role: Role
  userId: string
  workspaceId: number
}
export interface MemberWithDetails {
  id: number
  role: Role
  user: {
    id: string
    full_name: string
    email: string
  }
  workspace: {
    id: number
    name: string
  }
}
