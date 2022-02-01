
export const validUserArray = [
  {
    id: 1,
    username: 'user1',
    name: 'name1',
    disabled: false,
    createdAt: '2022-01-22T19:01:56.994Z',
    updatedAt: '2022-01-22T19:01:56.994Z',
    groups: [
      {
        id: 1,
        name: 'group1'
      },
      {
        id: 2,
        name: 'group2'
      }
    ]
  },
  {
    id: 2,
    username: 'user2',
    name: 'name2',
    disabled: true,
    createdAt: '2022-01-22T19:01:56.994Z',
    updatedAt: '2022-01-22T19:01:56.994Z',
    groups: []
  }
];

export const apiUserWithoutId = {
  username: 'user2',
  name: 'name2',
  disabled: true,
  createdAt: '2022-01-22T19:01:56.994Z',
  updatedAt: '2022-01-22T19:01:56.994Z',
  groups: []
};

export const apiUserWithoutUsername = {
  id: 1,
  name: 'name1',
  disabled: false,
  createdAt: '2022-01-22T19:01:56.994Z',
  updatedAt: '2022-01-22T19:01:56.994Z',
  groups: []
};

export const apiUserWithoutName = {
  id: 1,
  username: 'user1',
  disabled: false,
  createdAt: '2022-01-22T19:01:56.994Z',
  updatedAt: '2022-01-22T19:01:56.994Z',
  groups: []
};

export const apiUserWithInvalidDisabled = {
  id: 1,
  username: 'user1',
  name: 'name1',
  disabled: 'true',
  createdAt: '2022-01-22T19:01:56.994Z',
  updatedAt: '2022-01-22T19:01:56.994Z',
  groups: []
};

export const apiUserWithInvalidDate = {
  id: 1,
  username: 'user1',
  name: 'name1',
  disabled: false,
  createdAt: 2001,
  updatedAt: '2022-01-22T19:01:56.994Z',
  groups: []
};

export const apiUserWithNonArrayGroup = {
  id: 1,
  username: 'user1',
  name: 'name1',
  disabled: false,
  createdAt: '2022-01-22T19:01:56.994Z',
  updatedAt: '2022-01-22T19:01:56.994Z',
  groups: {
    id: 1,
    name: 'name'
  }
};

export const apiUserWithNonArrayGroups = {
  id: 2,
  username: 'user2',
  name: 'name2',
  disabled: true,
  createdAt: '2022-01-22T19:01:56.994Z',
  updatedAt: '2022-01-22T19:01:56.994Z',
  groups: {
    id: 1,
    name: 'name'
  }
}

export const apiUserWithMalformedGroup = {
  id: 2,
  username: 'user2',
  name: 'name2',
  disabled: true,
  createdAt: '2022-01-22T19:01:56.994Z',
  updatedAt: '2022-01-22T19:01:56.994Z',
  groups: [
    {
      id: '1',
      name: 'name'
    }
  ]
};
