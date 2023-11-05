import { gatherDoorData } from "test";
import { __interactionPeds } from "../../config/peds/interactions";

export let __globalStates = {
  time: {
    day: false,
    night: false,
  },
};

export function InitialSync() {
  SetRoutingBucketEntityLockdownMode(1, "strict");
  SetRoutingBucketPopulationEnabled(1, false);
  for (let i = 0; i < 9000000; i++) {
    if (DoesEntityExist(i)) {
      DeleteEntity(i);
    }
  }
  //REVIEW - Sync Doors here? is this a good solution for long term?
}
let NPCS: {
  ped: number;
  netIdFromEntity: number;
  entityFromNetId: number;
  scenario: string;
  coords: { x: number; y: number; z: number; heading: number };
  zone: string[];
}[] = [];
export async function InitialPedSetup() {
  for (const [key, value] of Object.entries(__interactionPeds)) {
    const ped = CreatePed(
      2,
      value.model,
      value.x,
      value.y,
      value.z,
      value.heading,
      true,
      true
    );
    SetPedDefaultComponentVariation(ped);
    SetPedRandomComponentVariation(ped, 0);
    SetPedRandomProps(ped);
    SetEntityRoutingBucket(ped, 1);
    Entity(ped).state.set("scenario", value.scenario, true);
    NPCS.push({
      netIdFromEntity: NetworkGetNetworkIdFromEntity(ped),
      entityFromNetId: NetworkGetEntityFromNetworkId(ped),
      ped: ped,
      scenario: value.scenario,
      coords: {
        x: value.x,
        y: value.y,
        z: value.z,
        heading: value.heading,
      },
      zone: value.label,
    });
  }
}
export function GetNPCS() {
  return NPCS;
}

onNet("getServerPeds", () => {
  emitNet("setupJobPeds", source, GetNPCS());
});

onNet("getServerDoors", async () => {
  try {
    const doorData = await gatherDoorData();
    emitNet("setupDoorStatusClient", -1, doorData);
  } catch (error) {
    console.log(error);
  }
});

// onNet("getWeather", () => {});
// onNet("getServerTime", () => {});
