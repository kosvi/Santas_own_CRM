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

export const validPersonWithWishes = {
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
  ]
};

export const wishIsMissingItem =  {
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
  ]
};

export const wishNotGivenAsArray =  {
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
    }
};

