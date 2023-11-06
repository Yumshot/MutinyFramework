import { HandoffCharacterData } from "controllers/playerJoining";
import { FindSteam } from "modules/utils/querys";
import { __databaseInstance } from "server";

onNet("relogUser", async (source: any) => {
  const __player = source;
  const __steam_target = FindSteam(__player);
  console.log(__steam_target, __player, " relogUser");
  const __characters = await __databaseInstance.GetUsersCharacterData({
    steam_target: __steam_target,
  });

  const __lastCharacter = await __databaseInstance.GetUserData({
    steam_target: __steam_target,
  });
  await HandoffCharacterData(
    __characters.characters,
    __lastCharacter.last_character,
    __player
  );
});
