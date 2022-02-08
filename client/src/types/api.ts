import { AxiosResponse } from 'axios';

export interface ErrorResponse {
  error: string
}

export interface ErrorWithResponse extends Error {
  response: AxiosResponse<ErrorResponse>
}

export interface MsgResponse {
  msg: string
}
