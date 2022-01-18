import { GroupAttributes, UserAttributes } from '.';

export interface UserWithGroups extends UserAttributes {
  groups: GroupAttributes[]
}