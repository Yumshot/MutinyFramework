/**
 * Event listener for when a player drops from the server.
 * @param reason The reason for the player's disconnection.
 */

import { FindSteam } from "modules/utils/queries";
import { __databaseInstance } from "server";

on("playerDropped", async (reason: any) => {
  //TODO - Check Player Data changes, and update the database accordingly.
  const coords = GetEntityCoords(GetPlayerPed(global.source.toString()));
  const heading = GetEntityHeading(GetPlayerPed(global.source.toString()));
  const name = GetPlayerName(global.source.toString());
  const id = global.source.toString();
  const model = GetEntityModel(GetPlayerPed(global.source.toString()));
  const health = GetEntityHealth(GetPlayerPed(global.source.toString()));
  const armor = GetPedArmour(GetPlayerPed(global.source.toString()));
  const ping = GetPlayerPing(global.source.toString());
  const __steam_target = FindSteam(global.source.toString());
  const __user = await __databaseInstance.GetUserData({
    steam_target: __steam_target,
  });
  if (!__user) {
    console.log(
      "Error retrieving user data on player drop.",
      name,
      __steam_target
    );
    return;
  }
  const __last = __user.last_character;
  const queryString = `characters.${__last}.last_location`;
  await __databaseInstance.UpdateUserData(__steam_target, {
    [queryString]: {
      x: coords[0],
      y: coords[1],
      z: coords[2],
      heading: heading,
    },
  });
});
