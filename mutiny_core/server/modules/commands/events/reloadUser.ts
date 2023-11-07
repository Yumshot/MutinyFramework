import { HandoffCharacterData } from "controllers/playerJoining";
import { FindSteam } from "modules/utils/queries";
import { __databaseInstance } from "server";

onNet("relogUser", async (source: any) => {
  const __player = source;
  const __steam_target = FindSteam(__player);
  const __characters = await __databaseInstance.GetUsersCharacterData({
    steam_target: __steam_target,
  });

  await HandoffCharacterData(__characters.characters, __player);
});
