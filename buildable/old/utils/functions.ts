import { PLAYER_STATUS } from "handlers/character";
import "./notifications";

export const Delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const MakeModelRequest = async (
  model: { model: string | number },
  time: any
) => {
  new Promise<void>(async (res) => {
    RequestModel(model.model);
    while (!HasModelLoaded(model.model)) {
      await Delay(time);
    }
    res();
  });
};

export const GtaHudRadar = (hud: boolean, radar: boolean) => {
  DisplayHud(hud);
  DisplayRadar(radar);
};

export const TpToCoords = async (x: number, y: number, z: number) => {
  const playerPed = PlayerPedId();
  const myVehicle = GetVehiclePedIsIn(playerPed, false);
  let entityToFreeze = playerPed;
  if (DoesEntityExist(myVehicle) && IsEntityAVehicle(myVehicle)) {
    SetNetworkVehicleRespotTimer(VehToNet(myVehicle), 5000);
    entityToFreeze = myVehicle;
  }
  SetPedCoordsKeepVehicle(playerPed, x, y, z);
  FreezeEntityPosition(entityToFreeze, true);
  while (!HasCollisionLoadedAroundEntity(entityToFreeze)) {
    await Delay(100);
  }
  FreezeEntityPosition(entityToFreeze, false);
};

export const SpawnVehicle = async (
  modelHash: string | number,
  data: { x: any; y: any; z: any; heading: any; network: any },
  markAsNotNeeded = true
) => {
  RequestModel(modelHash);
  while (!HasModelLoaded(modelHash)) {
    await Delay(100);
  }
  const myVehicle = CreateVehicle(
    modelHash,
    data.x,
    data.y,
    data.z,
    data.heading,
    data.network,
    false
  );
  if (markAsNotNeeded) {
    SetEntityAsNoLongerNeeded(myVehicle);
  }
  SetModelAsNoLongerNeeded(modelHash);
  return myVehicle;
};

export const RemoveVehicle = (myVehicle: number) => {
  SetEntityAsMissionEntity(myVehicle, true, true);
  DeleteEntity(myVehicle);
};

export const HasSpawned = (): boolean => {
  return PLAYER_STATUS.hasSpawned;
};

export const CalculateDistance = (
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number
): number => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dz = z2 - z1;
  return Math.hypot(dx, dy, dz);
};

export function getRandomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomPosition(coordinates: any[]) {
  let minX = Math.min(...coordinates.map((coord: { x: any }) => coord.x));
  let maxX = Math.max(...coordinates.map((coord: { x: any }) => coord.x));
  let minY = Math.min(...coordinates.map((coord: { y: any }) => coord.y));
  let maxY = Math.max(...coordinates.map((coord: { y: any }) => coord.y));

  return {
    x: getRandomInRange(minX, maxX),
    y: getRandomInRange(minY, maxY),
  };
}

export const SetupJobPeds = (pedHandle: number) => {
  console.log("SETTING UP PEDS");
  SetEntityAsMissionEntity(pedHandle, true, true);
  SetBlockingOfNonTemporaryEvents(pedHandle, true);
  SetPedFleeAttributes(pedHandle, 0, false);
  SetPedCombatAttributes(pedHandle, 17, true);
  SetPedCombatAttributes(pedHandle, 5, true);
  SetPedCombatAttributes(pedHandle, 46, true);
  SetPedCombatAttributes(pedHandle, 26, true);
  SetPedCombatAttributes(pedHandle, 0, true);
  SetPedCombatAttributes(pedHandle, 2, true);
  SetPedRelationshipGroupHash(pedHandle, GetHashKey("CIVMALE"));
  SetRelationshipBetweenGroups(0, GetHashKey("CIVMALE"), GetHashKey("PLAYER"));
  SetRelationshipBetweenGroups(0, GetHashKey("PLAYER"), GetHashKey("CIVMALE"));
  FreezeEntityPosition(pedHandle, true);
  SetPedDiesWhenInjured(pedHandle, false);
  SetPedConfigFlag(pedHandle, pedHandle, true);
  SetPedConfigFlag(pedHandle, 184, true);
  SetPedConfigFlag(pedHandle, 429, true);
  SetPedConfigFlag(pedHandle, 281, true);
  SetEntityInvincible(pedHandle, true);
};
