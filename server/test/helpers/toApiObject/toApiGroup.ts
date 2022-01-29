import { validateToNumber, validateToString, validateToDate, validateToBoolean } from '../../../src/utils/validators';

export interface ApiPermission {
  id: number,
  code: string,
  name: string,
  permission: {
    read: boolean,
    write: boolean
  }
}

export interface ApiGroup {
  id: number,
  name: string,
  createdAt: Date,
  updatedAt: Date,
  functionalities: Array<ApiPermission>
}

const validateToPermissions = (obj: unknown): { read: boolean, write: boolean } => {
  if (Object.prototype.hasOwnProperty.call(obj, 'read') && Object.prototype.hasOwnProperty.call(obj, 'write')) {
    const permission = obj as { read: boolean, write: boolean };
    return {
      read: validateToBoolean(permission.read),
      write: validateToBoolean(permission.write)
    };
  }
  // if read and write properties wasn't found, we have an error so let's throw one
  throw new Error('permissions given in incorrect format');
};

type PermissionFields = { id: unknown, code: unknown, name: unknown, permission: unknown };
const toApiPermission = ({ id, code, name, permission }: PermissionFields): ApiPermission => {
  const apiPermission: ApiPermission = {
    id: validateToNumber(id),
    code: validateToString(code),
    name: validateToString(name),
    permission: validateToPermissions(permission)
  };
  return apiPermission;
};

const toApiPermissions = (functionalities: unknown): Array<ApiPermission> => {
  if (!functionalities) {
    return [];
  }
  if (!(typeof functionalities === 'object' && functionalities instanceof Array)) {
    throw new Error('Permissions not given as an Array');
  }
  // This f as PermissionFields is not so safe, but we just have to live with it for now...
  const allPermissions = functionalities.map(f => toApiPermission(f as PermissionFields));
  return allPermissions;
};

/*
 * THIS ALLOWS US TO VERIFY DATA FROM API WITHOUT ALWAYS NEEDING eslint-disable-lines 
 * I know this may not be pretty, but best I can come up with
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toApiGroup = (data: any): ApiGroup => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return toApiGroupFromAny(data);
};

type GroupFields = { id: unknown, name: unknown, createdAt: unknown, updatedAt: unknown, functionalities: [{ id: unknown, code: unknown, name: unknown, permission: { read: unknown, write: unknown } }] };
const toApiGroupFromAny = ({ id, name, createdAt, updatedAt, functionalities }: GroupFields): ApiGroup => {
  const apiGroup: ApiGroup = {
    id: validateToNumber(id),
    name: validateToString(name),
    createdAt: validateToDate(createdAt),
    updatedAt: validateToDate(updatedAt),
    functionalities: toApiPermissions(functionalities)
  };
  return apiGroup;
};
