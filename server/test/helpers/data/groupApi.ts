
export const validGroupArray = [
  {
    id: 1,
    name: 'group1',
    createdAt: '2022-01-20T18:16:02.681Z',
    updatedAt: '2022-01-20T18:16:02.681Z',
    functionalities: [
      {
        id: 1,
        code: 'code1',
        name: 'name1',
        permission: {
          read: true,
          write: false
        }
      },
      {
        id: 2,
        code: 'code2',
        name: 'name2',
        permission: {
          read: false,
          write: false
        }
      }
    ]
  },
  {
    id: 2,
    name: 'group2',
    createdAt: '2022-01-20T18:16:02.681Z',
    updatedAt: '2022-01-20T18:16:02.681Z',
    functionalities: []
  }
];

export const groupObjectWithInvalidName = {
  id: 1,
  name: 12,
  createdAt: '2022-01-20T18:16:02.681Z',
  updatedAt: '2022-01-20T18:16:02.681Z',
  functionalities: []
};

export const groupObjectWithInvalidDate = {
  id: 1,
  name: 'name',
  createdAt: 'just-a-string',
  updatedAt: '2022-01-20T18:16:02.681Z',
  functionalities: []
};

export const groupObjectWithoutId = {
  name: 'name',
  createdAt: '2022-01-20T18:16:02.681Z',
  updatedAt: '2022-01-20T18:16:02.681Z',
  functionalities: []
};

export const groupObjectWithoutFunctionalities = {
  id: 1,
  name: 'name',
  createdAt: '2022-01-20T18:16:02.681Z',
  updatedAt: '2022-01-20T18:16:02.681Z'
};

export const groupObjectWithMissingPermission = {
  id: 1,
  name: 'name',
  createdAt: '2022-01-20T18:16:02.681Z',
  updatedAt: '2022-01-20T18:16:02.681Z',
  functionalities: [
    {
      id: 1,
      code: 'users',
      name: 'users'
    }
  ]
};

export const groupObjectWithPermissionMissingRead = {
  id: 1,
  name: 'name',
  createdAt: '2022-01-20T18:16:02.681Z',
  updatedAt: '2022-01-20T18:16:02.681Z',
  functionalities: [
    {
      id: 1,
      code: 'users',
      name: 'users',
      permission: {
        write: true
      }
    }
  ]
};

export const groupObjectWithIncorrectPermission = {
  id: 1,
  name: 'name',
  createdAt: '2022-01-20T18:16:02.681Z',
  updatedAt: '2022-01-20T18:16:02.681Z',
  functionalities: [
    {
      id: 1,
      code: 'users',
      name: 'users',
      permission: {
        read: 'string',
        write: true
      }
    }
  ]
};