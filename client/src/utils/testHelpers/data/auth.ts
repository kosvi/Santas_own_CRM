import { AuthUser } from '../../../types';

const loggedInUser: AuthUser = {
  id: 5,
  name: 'John Doe',
  username: 'john',
  loginTime: 123,
  activeGroup: 3,
  token: 'long-token-string',
  permissions: {
    users: {
      read: true,
      write: true
    },
    permissions: {
      read: true,
      write: true
    },
    people: {
      read: true,
      write: true
    },
    wishes_and_items: {
      read: true,
      write: true
    },
    entries: {
      read: true,
      write: true
    }
  },
  groups: [
    {
      id: 3,
      name: 'group-name'
    }
  ]
};

export const authData = {
  loggedInUser
};