import { AxiosRequestConfig } from 'axios';
import { API_BASE } from '../utils/config';

let token = 'null';

const setToken = (newToken: string): void => {
  token = newToken;
};

const getAxiosRequestConfigWithoutToken = (): AxiosRequestConfig => {
  const axiosRequestConfigWithoutToken: AxiosRequestConfig = {
    baseURL: API_BASE
  };
  return axiosRequestConfigWithoutToken;
};

const getAxiosRequestConfigWithToken = (): AxiosRequestConfig => {
  const axiosRequestConfigWithoutToken = getAxiosRequestConfigWithoutToken();
  const axiosRequestConfigWithToken: AxiosRequestConfig = {
    ...axiosRequestConfigWithoutToken,
    headers: { Authorization: `bearer ${token}` }
  };
  return axiosRequestConfigWithToken;
};

export const apiServices = {
  setToken, getAxiosRequestConfigWithoutToken, getAxiosRequestConfigWithToken
};
