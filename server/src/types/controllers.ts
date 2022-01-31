import express from 'express';
import { AccessTokenContent } from '.';

export interface PermissionWithFunctionality {
  id: number,
  groupId: number,
  functionalityId: number,
  read: boolean,
  write: boolean,
  functionality: {
    id: number,
    code: string,
    name: string
  }
}

export interface PermissionsInRequest {
  code: string,
  read: boolean,
  write: boolean
}

export interface RequestWithToken extends express.Request {
  decodedToken?: AccessTokenContent,
  permissions?: Array<PermissionsInRequest>
}
