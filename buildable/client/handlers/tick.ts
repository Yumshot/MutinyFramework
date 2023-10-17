import { Delay } from "utils/functions";
import { HasPlayerStatusChanged, PLAYER_STATUS } from "./character";

const minimap = RequestScaleformMovie("minimap");
DisplayHud(false);


setTick(async () => {
  await Delay(1500);
  if (HasPlayerStatusChanged()) {
    DisplayRadar(PLAYER_STATUS.isInVehicle);
    // emitNet("MUTINY:CORE:SERVER:PLAYER_STATUS_UPDATE", playerStatus);
  }
});


setTick(async () => {
  await Delay(50);
  if (minimap === 0) return;
  BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR");
  ScaleformMovieMethodAddParamInt(3);
  EndScaleformMovieMethod();
});

