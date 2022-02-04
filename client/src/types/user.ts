export interface UserData {
  id: number,
  name: string,
  username: string,
  loginTime: number,
  token: string
}

export type UserState = {
  user: UserData
};

export type UserAction = {
  type: string,
  user: UserData
};

