export type PermissionCode = 'users' | 'permissions' | 'people' | 'wishes_and_items' | 'entries';

export interface Functionality {
  id: number,
  code: PermissionCode,
  name: string,
  permission: {
    read: boolean,
    write: boolean
  }
}

export interface Group {
  id: number,
  name: string,
  createdAt: string,
  updatedAt: string
}

export interface GroupWithFunctionalities extends Group {
  functionalities: Array<Functionality>
}

export interface GroupsError {
  message: string
}

export interface GroupsState {
  error: GroupsError,
  groups: Array<GroupWithFunctionalities>
}
