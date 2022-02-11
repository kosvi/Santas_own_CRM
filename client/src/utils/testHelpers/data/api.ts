const defaultLoginResponse = {
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
  ]
};

export const apiData = {
  defaultLoginResponse
};
