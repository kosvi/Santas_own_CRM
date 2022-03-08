export interface NewUser {
  username: string,
  password: string,
  name: string,
  groupId?: number
}

export interface User {
  id: number,
  username: string,
  name: string,
  disabled: boolean,
  createdAt: string,
  updatedAt: string
}

interface UserGroup {
  id: number,
  name: string,
  functionalities?: [
    {
      id: number,
      code: string,
      name: string,
      permission: {
        read: boolean,
        write: boolean
      }
    }
  ]
}

export interface UserWithGroups extends User {
  groups: Array<UserGroup>
}

export type UsersState = {
  users: Array<UserWithGroups>
};