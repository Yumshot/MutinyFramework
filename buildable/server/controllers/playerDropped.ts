/**
 * Event listener for when a player drops from the server.
 * @param reason The reason for the player's disconnection.
 */

on("playerDropped", (reason: any) => {
  //TODO - Check Player Data changes, and update the database accordingly.
  const coords = GetEntityCoords(GetPlayerPed(global.source.toString()));
  const heading = GetEntityHeading(GetPlayerPed(global.source.toString()));
  const name = GetPlayerName(global.source.toString());
  const id = global.source.toString();
  const model = GetEntityModel(GetPlayerPed(global.source.toString()));
  const health = GetEntityHealth(GetPlayerPed(global.source.toString()));
});
