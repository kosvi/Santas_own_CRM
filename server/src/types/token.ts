export interface AccessTokenContent {
  id: number,
  name: string,
  username: string,
  activeGroup: number,
  loginTime: number
}

export interface UserWithGroupsInLogin {
  id: number,
  username: string,
  password: string,
  name: string,
  disabled: boolean,
  groups: Array<{ id: number, name: string }> | []
}
