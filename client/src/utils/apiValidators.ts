import { ErrorResponse, ErrorWithResponse } from '../types';
import { isString } from './validators';

function isErrorResponse(response: any): response is ErrorResponse {
  if(Object.prototype.hasOwnProperty.call(response, 'data') && Object.prototype.hasOwnProperty.call(response.data, 'error')) {
    if(isString(response.data.error)) {
      return true;
    }
  }
  return false;
}

function errorHasErrorResponse(error: any): error is ErrorWithResponse {
  if(Object.prototype.hasOwnProperty.call(error, 'response')) {
    if(isErrorResponse(error?.response)) {
      return true;
    }
  }
  return false;
}

export const apiValidators = {
  isErrorResponse, errorHasErrorResponse
};
