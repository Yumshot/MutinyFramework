import { Vector3 } from "classes/Vector3";

interface DoorPosition {
  id: number;
  lockedHeading: number;
  openHeading: number;
  locked: boolean;
  coords: Vector3;
  canOpen: boolean;
  double: boolean;
  lockedHeading2: number;
  openHeading2: number;
}

let doesOptionsExist = false;

onNet("setupDoorStatusClient", async (doorPositions: DoorPosition[]) => {
  const objects = GetGamePool("CObject");
  for (const door of doorPositions) {
    const target = door.id; // this is a model
    const object = objects.find(
      (obj: number) => GetEntityModel(obj) === target
    );
    if (!object) continue;

    const isLocked = door.locked;
    const heading = isLocked ? door.lockedHeading : door.openHeading;
    const isFrozen = door.openHeading === null;
    const isDouble = door.double;

    if (isFrozen) FreezeEntityPosition(object, isLocked);

    if (!isFrozen) {
      SetEntityHeading(object, heading);
      if (isLocked) {
        FreezeEntityPosition(object, true);
      } else {
        FreezeEntityPosition(object, false);
      }
    }

    if (isDouble) {
      const secondDoor = objects.find(
        (obj: number) =>
          GetEntityModel(obj) === target &&
          GetEntityCoords(obj, false)[0] !== GetEntityCoords(object, false)[0]
      );
      if (!secondDoor) continue;
      const heading2 = isLocked ? door.lockedHeading2 : door.openHeading2;
      const isFrozen2 = door.openHeading2 === null;
      if (isFrozen2) FreezeEntityPosition(secondDoor, isLocked);
      if (!isFrozen2) {
        SetEntityHeading(secondDoor, heading2);
        if (isLocked) {
          FreezeEntityPosition(secondDoor, true);
        } else {
          FreezeEntityPosition(secondDoor, false);
        }
      }
    }

    if (door.canOpen === false) {
      FreezeEntityPosition(object, true);
      global.exports.ox_target.removeModel(door.id);
      return;
    }

    const ped = PlayerPedId();
    const coords = GetEntityCoords(ped, true);
    const distance = GetDistanceBetweenCoords(
      coords[0],
      coords[1],
      coords[2],
      door.coords.x,
      door.coords.y,
      door.coords.z,
      true
    );

    if (distance >= 1) continue;

    const label = isLocked ? "Unlock Door" : "Lock Door";
    const name = `door_${door.id}`;

    global.exports.ox_target.removeModel(door.id);
    global.exports.ox_target.addModel(door.id, {
      label,
      name,
      distance: 0.5,
      onSelect: (data: any) => {
        emitNet("handleDoorInteraction", door.id);
        doesOptionsExist = !isLocked;
      },
    });
  }
});
