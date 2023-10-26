import { Permissions } from "config/enums/permissions";

/**
 * Interface for creating a user.
 */
export interface ICreateUser {
  steam_target: string;
  identifiers: string[];
  name: string;
  banned: boolean;
  permissions: Permissions;
  hex: string;
  priority: number;
  last_connection: Date;
  last_ip: string;
  last_character: number;
}
