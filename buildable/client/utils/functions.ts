import { PLAYER_STATUS } from "handlers/character";

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
