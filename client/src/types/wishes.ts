export interface NewWish {
  personId: number,
  itemName: string,
  description: string
}

export interface ReturnWish {
  id: number,
  personId: number,
  itemId: number,
  description: string
}