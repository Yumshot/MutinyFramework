import { ErrorKeys } from "config/errors";
import { __locations } from "config/globals";
import { commandHandler } from "modules/commands/commandHandler";
import { FindSteam } from "modules/utils/queries";
import { __databaseInstance } from "server";

/**
 * Retrieves character data for a given Steam target from the database on Join.
 * @param __steam_target The Steam target to retrieve character data for.
 * @returns A Promise that resolves with the retrieved character data.
 */
on("playerJoining", async (source: string, _oldID?: string) => {
  const __player = source;
  const __steam_target = FindSteam(__player);
  const __characters = await __databaseInstance.GetUsersCharacterData({
    steam_target: __steam_target,
  });

  if (!__characters) {
    DropPlayer(
      GetPlayerName(__player),
      `\n ⌠Mutiny Rp⌡ - Error creating your character! \n Please try again! \n If you have received this message more than once, please contact a staff member on discord! \n ${ErrorKeys[2]}`
    );
  }
  await HandoffCharacterData(__characters, source);
});

/**
 * Hand off data for Character UI and start the spawn process for the player.
 * @param player - The player joining the server.
 * @param last - The last character ID of the player.
 * @param src - The source of the player joining.
 */
export async function HandoffCharacterData(player: any, src: string) {
  // TODO: Hand off data for Character UI.
  emitNet("startSpawn", src, player);
  SetPlayerRoutingBucket(src, 0);
  commandHandler(src);
  emitNet("reloadSpawnEvent", src);
}
