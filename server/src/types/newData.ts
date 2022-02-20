/*
 * This file cantains types needed to reveice data trough rest-api
 */

export interface NewEntry {
  personId: number,
  userId: number,
  niceness: number,
  description: string
}

export interface NewWish {
  personId: number,
  itemName: string,
  description: string
}