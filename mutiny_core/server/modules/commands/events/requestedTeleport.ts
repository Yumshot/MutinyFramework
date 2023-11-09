import { Delay } from "modules/utils/delay";

onNet("teleportRequest", async (coords: any, serverSource?: any) => {
  const source = global.source;
  const playerPed = GetPlayerPed(source.toString());
  if (playerPed) {
    await Delay(1000);
    SetEntityCoords(
      playerPed,
      coords.x,
      coords.y,
      coords.z,
      false,
      false,
      false,
      false
    );
  } else {
    const playerPed = GetPlayerPed(serverSource.toString());
    await Delay(1000);
    SetEntityCoords(
      playerPed,
      coords.x,
      coords.y,
      coords.z + 0.25,
      false,
      false,
      false,
      false
    );
  }
});
