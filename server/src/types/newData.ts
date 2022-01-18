/*
 * This file cantains types needed to create new data-entries to database
 */

import { EntryAttributes } from '.';

export type NewEntry = Omit<EntryAttributes, 'id' | 'userId' | 'personId'>;