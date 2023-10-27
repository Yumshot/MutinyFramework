import { Permissions } from "config/enums/permissions";
import { IUser } from "modules/interfaces/IUser";
import { __databaseInstance } from "server";
import { v4 as uuidv4 } from "uuid";

/**
<<<<<<< HEAD
 * Create a user builder.
 * @param __steam - The steam ID of the user.
 * @param __name - The name of the user.
 * @param __source - The source of the user.
 * @class BuildFreshUser
 * @classdesc The class that handles building a fresh user.
 * @example  const __builder = new BuildFreshUser("steam:110000112345678", "John Doe", 1)
=======
 * Class representing a user builder.
>>>>>>> b5e75a5 (refactor(client): move old files to old folder)
 */
export default class BuildFreshUser {
  __steam: string;
  __name: string;
  __source: number | string;

<<<<<<< HEAD
=======
  /**
   * Create a user builder.
   * @param __steam - The steam ID of the user.
   * @param __name - The name of the user.
   * @param __source - The source of the user.
   */
>>>>>>> b5e75a5 (refactor(client): move old files to old folder)
  constructor(__steam: string, __name: string, __source: number | string) {
    this.__steam = __steam;
    this.__name = __name;
    this.__source = __source;
  }

  /**
   * Execute the user builder.
   * @returns A promise that resolves to an object representing the created user.
   */
  public async __execute(): Promise<IUser> {
    const __usersCollection = await __databaseInstance.GetUsersCollection();
    const __count = await __usersCollection.countDocuments();
    const __builder: IUser = {
      id: __count + 1,
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
