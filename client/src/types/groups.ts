export type PermissionCode = 'users' | 'permissions' | 'people' | 'wishes_and_items' | 'entries';

export interface Functionality {
  id: number,
  code: PermissionCode,
  name: string
}

export interface FunctionalityWithPermission extends Functionality {
  permission: {
    read: boolean,
    write: boolean
  }
}

export interface GroupFunctionality {
  groupId: number,
  functionalityId: number,
  read: boolean,
  write: boolean
}

export interface Group {
  id: number,
  name: string,
  createdAt: string,
  updatedAt: string
}

export interface GroupWithFunctionalities extends Group {
  functionalities: Array<FunctionalityWithPermission>
}

export interface GroupsError {
  message: string
}

export interface GroupsState {
  error: GroupsError,
  groups: Array<GroupWithFunctionalities>,
  functionalities: Array<Functionality>
}
