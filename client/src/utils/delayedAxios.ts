import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { FAKED_API_DELAY } from './config';

type METHOD = 'get' | 'post' | 'put' | 'delete';

export const waitGivenTime = async (time: number): Promise<void> => {
  return await new Promise((resolv) => {
    setTimeout(resolv, time);
  });
};

const assertNever = (value: never): never => {
  throw new Error(`Error: ${JSON.stringify(value)}`);
};

export async function apiRequest<T, U>(method: METHOD, endpoint: string, config: AxiosRequestConfig, payload: U | undefined = undefined): Promise<AxiosResponse<T, any>> {
  await waitGivenTime(FAKED_API_DELAY);
  switch (method) {
  case 'get':
    return await axios.get<T>(endpoint, config);
  case 'post':
    return await axios.post<T>(endpoint, payload, config);
  case 'put':
    return await axios.put<T>(endpoint, payload, config);
  case 'delete':
    return await axios.delete<T>(endpoint, config);
  default:
    return assertNever(method);
  }
}
