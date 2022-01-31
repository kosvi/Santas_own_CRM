import express from 'express';
import { GroupAttributes, UserAttributes, AccessTokenContent } from '.';

export interface UserWithGroups extends UserAttributes {
  groups: GroupAttributes[]
}

export interface RequestWithToken extends express.Request {
  decodedToken?: AccessTokenContent
}
