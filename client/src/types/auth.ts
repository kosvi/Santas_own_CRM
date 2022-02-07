export interface AuthUser {
  id: number,
  name: string,
  username: string,
  loginTime: number,
  activeGroup: number,
  token: string
}

export interface AuthError {
  message: string
}

export type AuthState = {
  isLoggedin: boolean,
  user?: AuthUser,
  error: AuthError
};
