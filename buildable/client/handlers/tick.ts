import { Delay, GtaHudRadar } from "utils/functions";
import { HasPlayerStatusChanged, PLAYER_STATUS } from "./character";
import { BAN_WEAPONS, DISCORD } from "../../common/globals";
import { DiscordRichPresence } from "handlers/discord";

const minimap = RequestScaleformMovie("minimap");
SetMaxWantedLevel(0);

setTick(async () => {
  if (HasPlayerStatusChanged()) {
    DisplayRadar(PLAYER_STATUS.isInVehicle);
    // emitNet("MUTINY:CORE:SERVER:PLAYER_STATUS_UPDATE", playerStatus);
  }
  SetVehicleDensityMultiplierThisFrame(0.1);

  // Update minimap health and armor
  if (minimap !== 0) {
    BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR");
    ScaleformMovieMethodAddParamInt(3);
    EndScaleformMovieMethod();
  }

  await Delay(1000);
});
