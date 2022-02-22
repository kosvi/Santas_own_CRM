export interface NewEntry {
  personId: number,
  niceness: number,
  description: string
}

export interface FullEntry extends NewEntry {
  id: number,
  userId: number,
  createdAt: string,
  updatedAt: string
}