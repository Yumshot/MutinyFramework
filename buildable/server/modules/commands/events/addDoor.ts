import { DoorInsert } from "modules/utils/doors";
import { __databaseInstance } from "server";

export async function addNewDoor(source: string, args: string | any[]) {
  if (args.length === 0) {
    console.log("Please provide a door ID");
    return;
  }
  const doorId = Number(args[0]);
  const lockedHeading = Number(args[1]);
  const openHeading = args[2] ? Number(args[2]) : null;
  const locked = args[3] ? Boolean(args[3]) : true;
  const coords = GetEntityCoords(GetPlayerPed(source));
  const canOpen = args[4] ? Boolean(args[4]) : true;
  const double = args[5] ? Boolean(args[5]) : false;
  const lockedHeading2 = args[6] ? Number(args[6]) : null;
  const openHeading2 = args[7] ? Number(args[7]) : null;
  const query: DoorInsert = {
    id: doorId,
    lockedHeading: lockedHeading,
    openHeading: openHeading,
    locked: locked,
    coords: [coords[0], coords[1], coords[2]],
    canOpen: canOpen,
  };
  if (double) {
    query.double = double;
    query.lockedHeading2 = lockedHeading2;
    query.openHeading2 = openHeading2;
  }
  await __databaseInstance.InsertNewDoor(query);
}
