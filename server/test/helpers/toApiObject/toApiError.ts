import { validateToString } from '../../../src/utils/validators';

export interface ApiError {
  error: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toApiError = (data: any): ApiError => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return toApiErrorFromAny(data);
};

type ErrorFields = { error: unknown };
const toApiErrorFromAny = ({ error }: ErrorFields): ApiError => {
  return {
    error: validateToString(error)
  };
};
