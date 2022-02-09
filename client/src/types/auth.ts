type PermissionCode = 'users' | 'permissions' | 'people' | 'wishes_and_items' | 'entries';

export interface Permission {
  code: PermissionCode
  read: boolean,
  write: boolean
}

export interface Permissions {
  users: Omit<Permission, 'code'>,
  permissions: Omit<Permission, 'code'>,
  people: Omit<Permission, 'code'>,
  wishes_and_items: Omit<Permission, 'code'>,
  entries: Omit<Permission, 'code'>
}

export interface AuthUser {
  id: number,
  name: string,
  username: string,
  loginTime: number,
  activeGroup: number,
  token: string,
  permissions: Array<Permission>
}

export interface AuthError {
  message: string
}

export type AuthState = {
  isLoggedin: boolean,
  user?: AuthUser,
  permissions?: Permissions,
  error: AuthError
};
