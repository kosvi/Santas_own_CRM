import { Group } from '../../types';

const defaultNewGroup: Group = {
  id: 100,
  name: 'Foobar',
  createdAt: '2022-01-24T07:53:48.355Z',
  updatedAt: '2022-01-24T07:53:48.355Z'
};

const defaultFullGroup: GroupWithFunctionalities = {
  id: 4,
  name: 'foo',
  createdAt: '2022-01-24T17:04:52.347Z',
  updatedAt: '2022-01-24T17:04:52.347Z',
  functionalities: [
    {
      id: 1,
      code: 'users',
      name: 'Users',
      permission: {
        read: false,
        write: false
      }
    },
    {
      id: 2,
      code: 'permissions',
      name: 'Groups and permissions',
      permission: {
        read: false,
        write: false
      }
    }
  ]
};

export const groupData = {
  defaultNewGroup, defaultFullGroup
};
