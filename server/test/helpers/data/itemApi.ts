export const validItemArray = [
  {
    count: '3',
    item: {
      id: 3,
      name: 'Chess'
    }
  },
  {
    count: '3',
    item: {
      id: 5,
      name: 'Xbox'
    }
  }
];

export const invalidItemMissingCount = {
  item: {
    id: 3,
    name: 'Pony'
  }
};

export const invalidItemMalformedCount = {
  count: 'string',
  item: {
    id: 1,
    name: 'Toy Car'
  }
};

export const invalidItemWithEmptyItem = {
  count: '2',
  item: {}
};

export const invalidItemWithMissingName = {
  count: '10',
  item: {
    id: 4
  }
};

export const invalidItemWithNumberAsName = {
  count: '4',
  item: {
    id: 1,
    name: 10
  }
};