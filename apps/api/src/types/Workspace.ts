export interface createWorkspacePayload {
  name: string;
  userIds: string[];
}

export interface updateWorkspacePayload {
  name?: string;
  userIds?: string[];
}

export interface deleteWorkspacePayload {
  workspaceId: string;
}

export interface Workspace {
  id: string;
  name: string;
  users: string[];
}
