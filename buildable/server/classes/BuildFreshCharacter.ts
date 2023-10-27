import { ICharacter } from "modules/interfaces/ICharacter";

<<<<<<< HEAD
/**
 * Creates a new instance of BuildFreshCharacter.
 * @param id - The user ID.
 * @param steam - The Steam target.
 * @class BuildFreshCharacter
 * @classdesc The class that handles building a fresh character.
 * @example const __builder = new BuildFreshCharacter(1, "steam:110000112345678");
 */
export default class BuildFreshCharacter {
  __user_id: number;
  __steam_target: string;

=======
export default class BuildFreshCharacter {
  __user_id: number;
  __steam_target: string;
>>>>>>> b5e75a5 (refactor(client): move old files to old folder)
  constructor(id: number, steam: string) {
    this.__user_id = id;
    this.__steam_target = steam;
  }

<<<<<<< HEAD
  /**
   * Executes the building of a fresh character.
   * @returns A promise that resolves to an ICharacter object.
   */
  public async __execute(): Promise<ICharacter> {
=======
  public async __execute() {
>>>>>>> b5e75a5 (refactor(client): move old files to old folder)
    const __builder: ICharacter = {
      user_id: this.__user_id,
      steam_target: this.__steam_target,
      characters: [],
    };

    return __builder;
  }
}
