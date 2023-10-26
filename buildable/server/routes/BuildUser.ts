import { Permissions } from "config/enums/permissions";
import { ICreateUser } from "modules/interfaces/ICreateUser";
import { v4 as uuidv4 } from "uuid";

export default class BuildUser {
  __steam: string;
  __name: string;
  __source: number | string;
  constructor(__steam: string, __name: string, __source: number | string) {
    this.__steam = __steam;
    this.__name = __name;
    this.__source = __source;
  }

  public async __execute(): Promise<ICreateUser> {
    const __builder: ICreateUser = {
      steam_target: this.__steam,
      identifiers: getPlayerIdentifiers(this.__source),
      name: this.__name,
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
