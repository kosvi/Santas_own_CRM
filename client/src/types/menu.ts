import { PermissionCode } from '.';

export interface MenuItem {
  title: string,
  permission?: PermissionCode,
  to?: string
}
