export interface NewPerson {
  name: string,
  birthdate: string,
  address: string
}

export interface Person extends NewPerson {
  id: number,
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

export interface PeopleState {
  people: {
    [id: number]: FullPerson
  }
}
