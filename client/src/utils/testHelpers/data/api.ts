import { AuthUserDTO } from '../../../types';

const defaultLoginResponse: AuthUserDTO = {
  username: 'santa',
  name: 'Santa Claus',
  id: 1,
  activeGroup: 3,
  loginTime: 1644220693183,
  token: 'super-duper-long-string',
  permissions: [
    {
      code: 'users',
      read: true,
      write: false
    },
    {
      code: 'permissions',
      read: false,
      write: false
    }
  ],
  groups: [
    {
      id: 3,
      name: 'santa'
    }
  ]
};

export const apiData = {
  defaultLoginResponse
};
