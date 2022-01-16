import { UserAttributes } from '../types';

export const users: UserAttributes[] = [
  {
    username: 'santa',
    password: 'santa',
    name: 'Santa Claus',
    disabled: false
  },
  {
    username: 'elf',
    password: 'elf',
    name: 'Small Elf',
    disabled: false
  },
  {
    username: 'mickey',
    password: 'mouse',
    name: 'Mickey Mouse',
    disabled: true
  }
];

export default users;