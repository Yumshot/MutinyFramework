import { Permissions } from "config/enums/permissions";
import { ICharacterData } from "./ICharacter";

/**
 * Interface for creating a user.
 */
export interface IUser {
  id: number;
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
  characters: ICharacterData[];
}
