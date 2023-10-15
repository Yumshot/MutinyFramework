import { Delay } from "utils/functions";

onNet(
  "MUTINY:CORE:CLIENT:HANDLE_TELEPORT",
  async (coords: { x: number; y: number; z: number; heading: number }) => {
    const ped = PlayerPedId();
    DoScreenFadeOut(10000);
    FreezeEntityPosition(ped, true);
    await Delay(2500);
    SetEntityInvincible(ped, true);
    SetEntityCoordsNoOffset(
      ped,
      coords.x,
      coords.y,
      coords.z,
      false,
      false,
      false
    );
    SetEntityHeading(ped, coords.heading);
    await Delay(2500);
    DoScreenFadeIn(10000);
    SetEntityInvincible(ped, false);
    FreezeEntityPosition(ped, false);
  }
);
