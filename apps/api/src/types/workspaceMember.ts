import { Workspace } from '@saas-monorepo/database';

export interface WorkspaceMember {
  id: number;
  role: Role;
  userId: string;
  workspaceId: number;
  workspace: Workspace;
}
export interface WorkspaceMemberPayload {
  role: Role;
  userId: string;
  workspaceId: string;
}

export interface UpdateMemberPayload {
  role?: Role;
  userId?: string;
  workspaceId?: number;
}

export type Role = 'Editor' | 'Viewer';
