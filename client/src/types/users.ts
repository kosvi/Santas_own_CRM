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

export interface UserWithGroups extends User {
  groups: [
    {
      id: number,
      name: string
    }
  ]
}

export type UsersState = {
  users: Array<UserWithGroups>
};