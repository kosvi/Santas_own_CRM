import { UserAttributes } from '../types';

const users: UserAttributes[] = [
  {
    username: 'foo',
    password: 'bar',
    name: 'foobar',
    disabled: true
  },
  {
    username: 'elf',
    password: 'elf',
    name: 'Small Elf',
    disabled: false
  }
];

export default users;