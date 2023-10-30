import { Delay } from "modules/utils/delay";

onNet("teleportRequest", async (coords: any) => {
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
  }
});
