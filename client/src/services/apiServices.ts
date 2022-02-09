import { AxiosRequestConfig } from 'axios';
import { API_BASE } from '../utils/config';

let token = 'null';

const setToken = (newToken: string) => {
  token = newToken;
};

const AxiosRequestConfigWithoutToken: AxiosRequestConfig = {
  baseURL: API_BASE
};

const axiosRequestConfigWithToken: AxiosRequestConfig = {
  ...AxiosRequestConfigWithoutToken,
  headers: { Authorization: `bearer ${token}` }
};

export const apiServices = {
  setToken
};

export const apiObjects = {
  AxiosRequestConfigWithoutToken, axiosRequestConfigWithToken
};
