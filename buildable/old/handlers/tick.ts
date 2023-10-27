import { Delay } from "utils/functions";
import { HasPlayerStatusChanged, PLAYER_STATUS } from "./character";

const minimap = RequestScaleformMovie("minimap");

SetMaxWantedLevel(0);
SetAggressiveHorns(false);
SetPoliceIgnorePlayer(PlayerId(), true);
SetPoliceRadarBlips(false);
SetCreateRandomCops(false);
SetCreateRandomCopsNotOnScenarios(false);
SetGarbageTrucks(false);
SwitchTrainTrack(0, true);
SetTrainTrackSpawnFrequency(0, 5);
SetRandomTrains(true);
SetRandomBoats(false);

let isVehHudActive = false;
let timer = 1000;

setTick(async () => {
  if (HasPlayerStatusChanged()) {
    DisplayRadar(PLAYER_STATUS.isInVehicle);
  }

  if (PLAYER_STATUS.isInVehicle && !IsPauseMenuActive()) {
    const ped = PlayerPedId();
    const veh = GetVehiclePedIsIn(ped, true);
    if (!veh) return;
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

const { exports: exp } = global as any;

exp["cfx-anes-worldsync"].useTime({
  range: [7, 19],
  onStateChange: (state: any) => {
    if (state) {
      const objectPool = GetGamePool("CObject");
      for (let i = 0; i < objectPool.length; i++) {
        const hash = GetEntityModel(objectPool[i]);
        if (hash === -1852609017) {
          const [x, y, z] = GetEntityCoords(objectPool[i], false);
          const checkSpot = [901.157, -1685.904, 46.384];
          const xCheck = Math.round(x) === Math.round(checkSpot[0]);
          const yCheck = Math.round(y) === Math.round(checkSpot[1]);
          const zCheck = Math.round(z) === Math.round(checkSpot[2]);
          if (xCheck && yCheck && zCheck) {
            SetEntityHeading(objectPool[i], -94.519);
          }
        }
      }
    }
  },
});

exp["cfx-anes-worldsync"].useTime({
  range: [19, 7],
  onStateChange: (state: any) => {
    if (state) {
      const objectPool = GetGamePool("CObject");
      for (let i = 0; i < objectPool.length; i++) {
        const hash = GetEntityModel(objectPool[i]);
        if (hash === -1852609017) {
          const [x, y, z] = GetEntityCoords(objectPool[i], false);
          const checkSpot = [901.157, -1685.904, 46.384];
          const xCheck = Math.round(x) === Math.round(checkSpot[0]);
          const yCheck = Math.round(y) === Math.round(checkSpot[1]);
          const zCheck = Math.round(z) === Math.round(checkSpot[2]);
          if (xCheck && yCheck && zCheck) {
            SetEntityHeading(objectPool[i], -174.219);
          }
        }
      }
    }
  },
});
