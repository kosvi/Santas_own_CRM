import { EntryAttributes } from '../types';
export type ResetEntry = Omit<EntryAttributes, 'id' | 'userId' | 'personId'>;

export const entries: ResetEntry[] = [
  {
    niceness: 4,
    description: 'Took out the garbage'
  },
  {
    niceness: -10,
    description: 'Took a toy from anothers hand'
  }
];
