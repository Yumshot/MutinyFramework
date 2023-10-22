import { Delay } from "utils/functions";
import { HasPlayerStatusChanged, PLAYER_STATUS } from "./character";

const minimap = RequestScaleformMovie("minimap");
SetMaxWantedLevel(0);
let isVehHudActive = false;
let timer = 1000;
setTick(async () => {
  if (HasPlayerStatusChanged()) {
    DisplayRadar(PLAYER_STATUS.isInVehicle);
  }

  SetVehicleDensityMultiplierThisFrame(0.1);

  if (PLAYER_STATUS.isInVehicle && !IsPauseMenuActive()) {
    const ped = PlayerPedId();
    const veh = GetVehiclePedIsIn(ped, true);
    if (!veh) return;
    const vehClass = GetVehicleClass(veh);
    const vehModel = GetEntityModel(veh);
    const vehName = GetDisplayNameFromVehicleModel(vehModel);
    const vehPlate = GetVehicleNumberPlateText(veh);
    const vehSpeed = GetEntitySpeed(veh);
    const vehSpeedKmh = Math.round(vehSpeed * 3.6);
    const vehSpeedMph = Math.round(vehSpeed * 2.236936);
    const vehSpeedKnots = Math.round(vehSpeed * 1.943844);
    const vehFuel = GetVehicleFuelLevel(veh);
    const vehMaxFuel = GetVehicleHandlingFloat(
      veh,
      "CHandlingData",
      "fPetrolTankVolume"
    );
    const vehFuelPercentage = Math.round((vehFuel / vehMaxFuel) * 100);
    const vehHealth = GetVehicleEngineHealth(veh);
    const vehHealthPercentage = Math.round((vehHealth / 1000) * 100);
    const vehBodyHealth = GetVehicleBodyHealth(veh);
    const vehBodyHealthPercentage = Math.round((vehBodyHealth / 1000) * 100);

    SendNUIMessage({
      event: "VEHICLE_HUD",
      state: true,
      options: {
        speed: {
          kmh: vehSpeedKmh,
          mph: vehSpeedMph,
          knots: vehSpeedKnots,
        },
        fuel: {
          level: vehFuel,
          percentage: vehFuelPercentage,
        },
        health: {
          engine: {
            level: vehHealth,
            percentage: vehHealthPercentage,
          },
          body: {
            level: vehBodyHealth,
            percentage: vehBodyHealthPercentage,
          },
        },
      },
    });
    isVehHudActive = true;
    timer = 250;
  } else {
    SendNUIMessage({
      event: "VEHICLE_HUD",
      state: false,
    });
    timer = 1000;
    isVehHudActive = false;
  }

  // Update minimap health and armor
  if (minimap !== 0) {
    BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR");
    ScaleformMovieMethodAddParamInt(3);
    EndScaleformMovieMethod();
  }

  await Delay(timer);
});
