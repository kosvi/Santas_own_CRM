import { UserAttributes } from '../types';
import { hashPassword } from '../utils/hashPasswords';

export const users: UserAttributes[] = [
  {
    username: 'santa',
    password: hashPassword('santa'),
    name: 'Santa Claus',
    disabled: false
  },
  {
    username: 'elf',
    password: hashPassword('elf'),
    name: 'Small Elf',
    disabled: false
  },
  {
    username: 'mickey',
    password: hashPassword('mouse'),
    name: 'Mickey Mouse',
    disabled: true
  },
  {
    username: 'admin',
    password: hashPassword('password'),
    name: 'Admin Elf',
    disabled: false
  },
  {
    username: 'nobody',
    password: hashPassword('nobody'),
    name: 'Someone Without Group',
    disabled: false
  }
];
