<<<<<<< HEAD
import { ErrorKeys } from "config/errors";
import { __locations } from "config/globals";
import { FindSteam } from "modules/utils/querys";
import BuildFreshCharacter from "classes/BuildFreshCharacter";
import { __databaseInstance } from "server";

/**
 * Retrieves character data for a given Steam target from the database on Join.
 * @param __steam_target The Steam target to retrieve character data for.
 * @returns A Promise that resolves with the retrieved character data.
 */
on("playerJoining", async (source: string, oldID?: string) => {
  const __player = source;
  const __steam_target = FindSteam(__player);
  const __characters = await __databaseInstance.GetUsersCharacterData({
    steam_target: __steam_target,
  });

  if (!__characters) {
    await CreateNewCharacter(__player, __steam_target);
  } else {
    const __lastCharacter = await __databaseInstance.GetUserData({
      steam_target: __steam_target,
    });
    await HandoffCharacterData(
      __characters.characters,
      __lastCharacter.last_character,
      __player
    );
  }
});

/**
 * Creates a new character for the given player and steam target.
 * @param {string} player - The player's identifier.
 * @param {string} steam_target - The steam target identifier.
 * @returns {Promise<void>} - A Promise that resolves when the character is created.
 */
async function CreateNewCharacter(
  player: string,
  steam_target: string
): Promise<void> {
  let __user = await __databaseInstance.GetUserData({
    steam_target: steam_target,
  });
  const __builder = await new BuildFreshCharacter(
    __user.id,
    steam_target
  ).__execute();

  if (__builder) {
    await __databaseInstance.SetNewCharacterData(__builder);
    await HandoffCharacterData(__builder.characters, 0, player);
  } else {
    DropPlayer(
      player,
      `\n ⌠Mutiny Rp⌡ - Error creating your character! \n Please try again! \n If you have received this message more than once, please contact a staff member on discord! \n ${ErrorKeys[2]}`
    );
  }
}

/**
 * Hand off data for Character UI and start the spawn process for the player.
 * @param player - The player joining the server.
 * @param last - The last character ID of the player.
 * @param src - The source of the player joining.
 */
async function HandoffCharacterData(player: any, last: number, src: string) {
  // TODO: Hand off data for Character UI.
  emitNet("startSpawn", src, player, last);
  SetPlayerRoutingBucket(src, 1);
}
=======
import { Delay } from "modules/utils/delay";

on("playerJoining", async (source: string, oldID?: string) => {
  console.log("PLAYER JOINING - first");
});
>>>>>>> dffda90 (feat(server): add entityCreated, entityCreating, mumbleConnected, playerDropped, playerJoining)
