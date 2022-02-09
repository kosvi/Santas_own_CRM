import { AxiosError } from 'axios';
import { ErrorResponse } from '../types';
import { isString } from './validators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isErrorResponse(response: any): response is ErrorResponse {
  if (Object.prototype.hasOwnProperty.call(response, 'data') && Object.prototype.hasOwnProperty.call(response.data, 'error')) {
    if (isString(response.data.error)) {
      return true;
    }
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function errorIsResponseError(error: any): error is AxiosError<ErrorResponse> {
  if (Object.prototype.hasOwnProperty.call(error, 'response')) {
    if (isErrorResponse(error?.response)) {
      return true;
    }
  }
  return false;
}

export const apiValidators = {
  errorIsResponseError
};
