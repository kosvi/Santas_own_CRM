import { PermissionCode } from '.';

export interface MenuItem {
  title: string,
  permission?: PermissionCode,
  url?: string,
  to?: string
}
