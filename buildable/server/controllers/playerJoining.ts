import { ErrorKeys } from "config/errors";
import { __locations } from "config/globals";
import { FindSteam } from "modules/utils/querys";
import BuildFreshCharacter from "classes/BuildFreshCharacter";
import { __databaseInstance } from "server";

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

async function CreateNewCharacter(player: string, steam_target: string) {
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

async function HandoffCharacterData(player: any, last: number, src: string) {
  // TODO: Hand off data for Character UI.
  emitNet("startSpawn", src, player, last);
}
