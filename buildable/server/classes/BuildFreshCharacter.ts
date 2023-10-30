import { ICharacter } from "modules/interfaces/ICharacter";

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 264a20d (Add Docs to all current files, to continue having a verbose documentation of this branch, this will most likely be merged shortly after i get a few systems squared away as they were previously.)
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

<<<<<<< HEAD
=======
export default class BuildFreshCharacter {
  __user_id: number;
  __steam_target: string;
>>>>>>> b5e75a5 (refactor(client): move old files to old folder)
=======
>>>>>>> 264a20d (Add Docs to all current files, to continue having a verbose documentation of this branch, this will most likely be merged shortly after i get a few systems squared away as they were previously.)
  constructor(id: number, steam: string) {
    this.__user_id = id;
    this.__steam_target = steam;
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 264a20d (Add Docs to all current files, to continue having a verbose documentation of this branch, this will most likely be merged shortly after i get a few systems squared away as they were previously.)
  /**
   * Executes the building of a fresh character.
   * @returns A promise that resolves to an ICharacter object.
   */
  public async __execute(): Promise<ICharacter> {
<<<<<<< HEAD
=======
  public async __execute() {
>>>>>>> b5e75a5 (refactor(client): move old files to old folder)
=======
>>>>>>> 264a20d (Add Docs to all current files, to continue having a verbose documentation of this branch, this will most likely be merged shortly after i get a few systems squared away as they were previously.)
    const __builder: ICharacter = {
      user_id: this.__user_id,
      steam_target: this.__steam_target,
      characters: [],
    };

    return __builder;
  }
}
