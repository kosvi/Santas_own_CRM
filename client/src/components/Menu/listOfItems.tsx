import { MenuItem } from '../../types';

export const listOfItems: Array<MenuItem> = [
  {
    title: 'Home',
    to: '/'
  },
  {
    title: 'People',
    permission: 'people',
    to: '/people'
  },
  {
    title: 'Permissions',
    permission: 'permissions',
    to: '/permissions'
  }
];
