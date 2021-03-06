import express from 'express';
import { AccessTokenContent } from '.';

export interface PermissionWithFunctionality {
  read: boolean,
  write: boolean,
  functionality: {
    code: string,
  }
}

export interface PermissionWithCode {
  code: string,
  read: boolean,
  write: boolean
}

export interface RequestWithToken extends express.Request {
  decodedToken?: AccessTokenContent,
  permissions?: Array<PermissionWithCode>
}
