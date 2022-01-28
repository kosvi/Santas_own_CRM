import { validateToNumber, validateToString, validateToDate, validateToBoolean } from '../../../src/utils/validators';

export interface ApiUserGroup {
  id: number,
  name: string,
  functionalities?: []
}

export interface ApiUser {
  id: number,
  username: string,
  name: string,
  disabled: boolean,
  createdAt: Date,
  updatedAt: Date,
  groups: Array<ApiUserGroup>
}

// Nasty way to avoid adding eslint-disable-lines all over tests
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toApiUser = (data: any): ApiUser => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return toApiUserFromAny(data);
};

type UserFields = { id: unknown, username: unknown, name: unknown, disabled: unknown, createdAt: unknown, updatedAt: unknown, groups: [{ id: unknown, name: unknown }] };
const toApiUserFromAny = ({ id, username, name, disabled, createdAt, updatedAt, groups }: UserFields): ApiUser => {
  return {
    id: validateToNumber(id),
    username: validateToString(username),
    name: validateToString(name),
    disabled: validateToBoolean(disabled),
    createdAt: validateToDate(createdAt),
    updatedAt: validateToDate(updatedAt),
    groups: toApiUserGroups(groups)
  };
};

const toApiUserGroups = (groups: unknown): Array<ApiUserGroup> => {
  if (!groups) {
    return [];
  }
  if (!(groups instanceof Array)) {
    throw new Error('Groups not given as an Array');
  }
  return groups.map(g => validateToUserGroup(g as ApiUserGroup));
};

const validateToUserGroup = (obj: unknown): ApiUserGroup => {
  if (Object.prototype.hasOwnProperty.call(obj, 'id') && Object.prototype.hasOwnProperty.call(obj, 'name')) {
    const userGroup = obj as ApiUserGroup;
    const validatedUserGroup = {
      id: validateToNumber(userGroup.id),
      name: validateToString(userGroup.name)
    };
    // For now we will not validate this, since we are not really testing this any more then just to see the array exists
    if (userGroup.functionalities) {
      return { ...validatedUserGroup, functionalities: userGroup.functionalities };
    }
    return validatedUserGroup;
  }
  throw new Error('group given in incorrect format');
};