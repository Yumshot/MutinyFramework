import { Permissions } from "config/enums/permissions";
import { ICreateUser } from "modules/interfaces/ICreateUser";
import { v4 as uuidv4 } from "uuid";

/**
 * Class representing a user builder.
 */
export default class BuildFreshUser {
  __steam: string;
  __name: string;
  __source: number | string;

  /**
   * Create a user builder.
   * @param __steam - The steam ID of the user.
   * @param __name - The name of the user.
   * @param __source - The source of the user.
   */
  constructor(__steam: string, __name: string, __source: number | string) {
    this.__steam = __steam;
    this.__name = __name;
    this.__source = __source;
  }

  /**
   * Execute the user builder.
   * @returns A promise that resolves to an object representing the created user.
   */
  public async __execute(): Promise<ICreateUser> {
    const __builder: ICreateUser = {
      steam_target: this.__steam,
      identifiers: getPlayerIdentifiers(this.__source),
      name: this.__name || GetPlayerName(this.__source.toString()),
      banned: false,
      permissions: Permissions.USER,
      hex: uuidv4(),
      priority: 0,
      last_connection: new Date(),
      last_ip: GetPlayerEndpoint(this.__source.toString()),
      last_character: 0,
    };
    return __builder;
  }
}
