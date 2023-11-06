import { __databaseInstance } from "server";

let __doorCache: string | any[] = [];

export async function gatherDoorData() {
  const dbQuery = await __databaseInstance.GatherDoorData();
  const targetData = dbQuery[0].global_doors;
  if (__doorCache !== targetData) {
    __doorCache = targetData;
    return __doorCache;
  } else {
    return __doorCache;
  }
}

onNet("getServerDoors", async () => {
  const doors = await gatherDoorData();
  return doors;
});

onNet("handleDoorInteraction", async (doorId: number) => {
  const doors = await gatherDoorData();
  for (const door of doors) {
    if (door.id === doorId) {
      const state = door.locked;
      __databaseInstance.UpdateDoorStatus(doorId, !state);
    }
  }
});

onNet("requestHiddenDoors", async (time: string) => {
  const doors = await gatherDoorData();
  for (const door of doors) {
    if (!door.canOpen) {
      if (time === "NIGHT") {
        __databaseInstance.UpdateDoorStatus(door.id, false);
      } else {
        __databaseInstance.UpdateDoorStatus(door.id, true);
      }
    }
  }
});

export interface DoorInsert {
  id: number;
  lockedHeading: number;
  openHeading: number | null;
  locked: boolean;
  coords: [number, number, number];
  canOpen: boolean;
  double?: boolean;
  lockedHeading2?: number;
  openHeading2?: number;
}
