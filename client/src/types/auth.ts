export type PermissionCode = 'users' | 'permissions' | 'people' | 'wishes_and_items' | 'entries';

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

interface CommonUser {
  id: number,
  name: string,
  username: string,
  loginTime: number,
  activeGroup: number,
  token: string,
}

// This is what the API sends us when logging in
export interface AuthUserDTO extends CommonUser {
  permissions: Array<Permission>
}

// this is what we parse from it
export interface AuthUser extends CommonUser {
  permissions: Permissions
}

export interface AuthError {
  message: string
}

export type AuthState = {
  isLoggedin: boolean,
  user?: AuthUser,
  error: AuthError
};
