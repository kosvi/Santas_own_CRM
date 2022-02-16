export interface Person {
  id: number,
  name: string,
  birthdate: string,
  address: string,
  createdAt: string,
  updatedAt: string
}

export interface ItemOfWish {
  id: number,
  name: string
}

export interface Wish {
  id: number,
  description: string,
  item: ItemOfWish
}

export interface Entry {
  id: number,
  userId: number,
  niceness: number,
  description: string,
  createdAt: string,
  updatedAt: string
}

export interface FullPerson extends Person {
  wishes: Array<Wish>,
  entries: Array<Entry>
}

export interface PersonNameAndId {
  name: string,
  id: number
}

export interface PeopleState {
  people: {
    [id: number]: FullPerson
  },
  names: Array<PersonNameAndId>
}
