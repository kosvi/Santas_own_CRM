import axios, { AxiosRequestConfig } from 'axios';

type METHOD = 'get' | 'post' | 'put' | 'delete';

export const waitGivenTime = async (time = 1000): Promise<void> => {
  return await new Promise((resolv) => {
    setTimeout(resolv, time);
  });
};

export async function apiRequest<T>({ method, endpoint, config, payload }: { method: METHOD, endpoint: string, config: AxiosRequestConfig, payload: Object | undefined }): Promise<T> {
  await waitGivenTime();
  switch (method) {
    case 'get':
      return await axios.get<T>(endpoint, config);
    case 'post':
      return await axios.post<T>(endpoint, payload, config);
    case 'put':
      return await axios.put<T>(endpoint, payload, config);
    case 'delete':
      return await axios.delete<T>(endpoint, payload, config);
  }
};
