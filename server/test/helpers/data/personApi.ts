export const validPeopleArray = [
  {
    id: 1,
    name: 'Mikko Mallikas',
    birthdate: '2014-11-15',
    address: 'Mikonkatu 12',
    createdAt: '2022-01-24T17:57:12.417Z',
    updatedAt: '2022-01-24T17:57:12.417Z'
  },
  {
    id: 2,
    name: 'Maija Mallikas',
    birthdate: '2012-07-30',
    address: 'Mikonkatu 12',
    createdAt: '2022-01-24T17:57:12.417Z',
    updatedAt: '2022-01-24T17:57:12.417Z'
  }
];

export const personWithoutId = {
  name: 'Maija Mallikas',
  birthdate: '2012-07-30',
  address: 'Mikonkatu 12',
  createdAt: '2022-01-24T17:57:12.417Z',
  updatedAt: '2022-01-24T17:57:12.417Z'
};

export const personWithNumberAsName = {
  id: 2,
  name: 100,
  birthdate: '2012-07-30',
  address: 'Mikonkatu 12',
  createdAt: '2022-01-24T17:57:12.417Z',
  updatedAt: '2022-01-24T17:57:12.417Z'
};

export const personWithInvalidBirthdate = {
  id: 2,
  name: 'Maija Mallikas',
  birthdate: '2012-07-40',
  address: 'Mikonkatu 12',
  createdAt: '2022-01-24T17:57:12.417Z',
  updatedAt: '2022-01-24T17:57:12.417Z'
};

export const personWithInvalidAddress = {
  id: 2,
  name: 'Maija Mallikas',
  birthdate: '2012-07-30',
  address: true,
  createdAt: '2022-01-24T17:57:12.417Z',
  updatedAt: '2022-01-24T17:57:12.417Z'
};

export const personWithInvalidUpdateAt = {
  id: 2,
  name: 'Maija Mallikas',
  birthdate: '2012-07-30',
  address: 'Mikonkatu 12',
  createdAt: '2022-01-24T27:57:12.417Z',
  updatedAt: '2022-01-24T17:57:12.417Z'
};

export const validPersonWithWishesAndEntries = {
  id: 2,
  name: 'Mikko Mallikas',
  birthdate: '2014-11-15',
  address: 'Mikonkatu 12',
  createdAt: '2022-01-24T17:57:12.417Z',
  updatedAt: '2022-01-24T17:57:12.417Z',
  wishes: [
    {
      id: 1,
      description: 'I want it to be lovely!',
      item: {
        id: 1,
        name: 'Pony'
      }
    },
    {
      id: 2,
      description: 'I want it to be lovely!',
      item: {
        id: 2,
        name: 'Toy car'
      }
    }
  ],
  entries: [
    {
      id: 1,
      userId: 1,
      niceness: 4,
      description: 'Took out the garbage',
      createdAt: '2022-01-25T18:19:13.271Z',
      updatedAt: '2022-01-25T18:19:13.271Z'
    },
    {
      id: 2,
      userId: 1,
      niceness: -10,
      description: 'Took a toy from anothers hand',
      createdAt: '2022-01-25T18:19:13.271Z',
      updatedAt: '2022-01-25T18:19:13.271Z'
    }
  ]
};

export const personWishIsMissingItem = {
  id: 2,
  name: 'Mikko Mallikas',
  birthdate: '2014-11-15',
  address: 'Mikonkatu 12',
  createdAt: '2022-01-24T17:57:12.417Z',
  updatedAt: '2022-01-24T17:57:12.417Z',
  wishes: [
    {
      id: 1,
      description: 'I want it to be lovely!'
    }
  ],
  entries: [
    {
      id: 2,
      userId: 1,
      niceness: -10,
      description: 'Took a toy from anothers hand',
      createdAt: '2022-01-25T18:19:13.271Z',
      updatedAt: '2022-01-25T18:19:13.271Z'
    }
  ]
};

export const personWishNotGivenAsArray = {
  id: 2,
  name: 'Mikko Mallikas',
  birthdate: '2014-11-15',
  address: 'Mikonkatu 12',
  createdAt: '2022-01-24T17:57:12.417Z',
  updatedAt: '2022-01-24T17:57:12.417Z',
  wishes: {
    id: 2,
    description: 'I want it to be lovely!',
    item: {
      id: 2,
      name: 'Toy car'
    }
  },
  entries: [
    {
      id: 2,
      userId: 1,
      niceness: -10,
      description: 'Took a toy from anothers hand',
      createdAt: '2022-01-25T18:19:13.271Z',
      updatedAt: '2022-01-25T18:19:13.271Z'
    }
  ]
};

export const personIsMissingEntries = {
  id: 2,
  name: 'Mikko Mallikas',
  birthdate: '2014-11-15',
  address: 'Mikonkatu 12',
  createdAt: '2022-01-24T17:57:12.417Z',
  updatedAt: '2022-01-24T17:57:12.417Z',
  wishes: [
    {
      id: 2,
      description: 'I want it to be lovely!',
      item: {
        id: 2,
        name: 'Toy car'
      }
    }
  ]
};

export const personWithInvalidEntryId = {
  id: 2,
  name: 'Mikko Mallikas',
  birthdate: '2014-11-15',
  address: 'Mikonkatu 12',
  createdAt: '2022-01-24T17:57:12.417Z',
  updatedAt: '2022-01-24T17:57:12.417Z',
  wishes: [
    {
      id: 2,
      description: 'I want it to be lovely!',
      item: {
        id: 2,
        name: 'Toy car'
      }
    }
  ],
  entries: [
    {
      id: '2',
      userId: 1,
      niceness: -10,
      description: 'Took a toy from anothers hand',
      createdAt: '2022-01-25T18:19:13.271Z',
      updatedAt: '2022-01-25T18:19:13.271Z'
    }
  ] 
};

export const personWithInvalidEntryNiceness = {
  id: 2,
  name: 'Mikko Mallikas',
  birthdate: '2014-11-15',
  address: 'Mikonkatu 12',
  createdAt: '2022-01-24T17:57:12.417Z',
  updatedAt: '2022-01-24T17:57:12.417Z',
  wishes: [
    {
      id: 2,
      description: 'I want it to be lovely!',
      item: {
        id: 2,
        name: 'Toy car'
      }
    }
  ],
  entries: [
    {
      id: 2,
      userId: 1,
      niceness: undefined,
      description: 'Took a toy from anothers hand',
      createdAt: '2022-01-25T18:19:13.271Z',
      updatedAt: '2022-01-25T18:19:13.271Z'
    }
  ] 
};