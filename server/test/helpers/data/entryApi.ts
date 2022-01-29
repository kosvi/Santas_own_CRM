export const validEntryArray = [
  {
    id: 3,
    userId: 1,
    personId: 1,
    niceness: 10,
    description: 'something',
    createdAt: '2022-01-27T18:48:08.355Z',
    updatedAt: '2022-01-27T18:48:08.355Z'
  },
  {
    id: 2,
    userId: 1,
    personId: 1,
    niceness: -5,
    description: 'something else',
    createdAt: '2022-01-26T18:48:08.355Z',
    updatedAt: '2022-01-26T18:48:08.355Z'
  }
];

export const invalidEntryWithoutId = {
  userId: 1,
  personId: 1,
  niceness: -5,
  description: 'something else',
  createdAt: '2022-01-26T18:48:08.355Z',
  updatedAt: '2022-01-26T18:48:08.355Z'
};

export const invalidEntryWithStringAsNiceness = {
  id: 2,
  userId: 1,
  personId: 1,
  niceness: '5',
  description: 'something else',
  createdAt: '2022-01-26T18:48:08.355Z',
  updatedAt: '2022-01-26T18:48:08.355Z'
};

export const invalidEntryWithNullAsDesc = {
  id: 2,
  userId: 1,
  personId: 1,
  niceness: -5,
  description: null,
  createdAt: '2022-01-26T18:48:08.355Z',
  updatedAt: '2022-01-26T18:48:08.355Z'
};

export const invalidEntryUserIdAsUndefined = {
  id: 2,
  userId: undefined,
  personId: 1,
  niceness: -5,
  description: 'something else',
  createdAt: '2022-01-26T18:48:08.355Z',
  updatedAt: '2022-01-26T18:48:08.355Z'
};

export const invalidEntryWithInvalidUpdateDate = {
  id: 2,
  userId: 1,
  personId: 1,
  niceness: -5,
  description: 'something else',
  createdAt: '2022-01-26T18:48:08.355Z',
  updatedAt: '01-26T18:48:08.355Z'
};
