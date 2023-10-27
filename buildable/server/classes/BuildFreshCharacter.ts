import { ICharacter } from "modules/interfaces/ICharacter";

export default class BuildFreshCharacter {
  __user_id: number;
  __steam_target: string;
  constructor(id: number, steam: string) {
    this.__user_id = id;
    this.__steam_target = steam;
  }

  public async __execute() {
    const __builder: ICharacter = {
      user_id: this.__user_id,
      steam_target: this.__steam_target,
      characters: [],
    };

    return __builder;
  }
}
