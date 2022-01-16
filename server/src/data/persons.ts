import { PersonAttributes } from '../types';

export const persons: PersonAttributes[] = [
  {
    name: 'Mikko Mallikas',
    birthdate: new Date(2014, 10, 15),
    address: 'Mikonkatu 12'
  },
  {
    name: 'Maija Mallikas',
    birthdate: new Date(2012, 6, 30),
    address: 'Mikonkatu 12'
  }
];

export default persons;