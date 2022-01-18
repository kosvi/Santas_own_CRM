/*
 * This file contains all the types, interfaces etc. required by the database related code. 
 * All --Attributes interfaces are used by ORM 
 */

export interface UserAttributes {
  id?: number,
  username: string,
  password: string,
  name: string,
  disabled: boolean
}

export interface SessionAttributes {
  id?: number,
  userId: number,
  token: string
}

export interface GroupAttributes {
  id?: number,
  name: string
}

export interface UserGroupAttributes {
  id?: number,
  userId: number,
  groupId: number
}

export interface FunctionalityAttributes {
  id?: number,
  code: string,
  name: string
}

export interface PermissionAttributes {
  id?: number,
  groupId: number,
  functionalityId: number,
  read: boolean,
  write: boolean
}

export interface EntryAttributes {
  id?: number,
  userId: number,
  personId: number,
  niceness: number,
  description: string
}

export interface PersonAttributes {
  id?: number,
  name: string,
  birthdate: Date,
  address: string
}

export interface WishAttributes {
  id?: number,
  personId: number,
  itemId: number,
  description: string
}

export interface ItemAttributes {
  id?: number,
  name: string
}

export type MigrationDirection = 'up' | 'down';