import { Vector3 } from "classes/Vector3";

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 264a20d (Add Docs to all current files, to continue having a verbose documentation of this branch, this will most likely be merged shortly after i get a few systems squared away as they were previously.)
/**
 * Listens for the "teleportToMarker" event and teleports the player to the location of their waypoint marker.
 * Emits the "teleportRequest" event with the coordinates of the waypoint marker.
 */
<<<<<<< HEAD
=======
>>>>>>> 8a47bc5 (Add teleportToMarker event handler)
=======
>>>>>>> 264a20d (Add Docs to all current files, to continue having a verbose documentation of this branch, this will most likely be merged shortly after i get a few systems squared away as they were previously.)
onNet("teleportToMarker", () => {
  const WaypointHandle = GetFirstBlipInfoId(8);
  if (DoesBlipExist(WaypointHandle)) {
    const waypointCoords = GetBlipInfoIdCoord(WaypointHandle);
    const groundCoords = GetGroundZCoordWithOffsets(
      waypointCoords[0],
      waypointCoords[1],
      waypointCoords[2]
    );
    const coords = new Vector3([
      waypointCoords[0],
      waypointCoords[1],
      groundCoords[1],
    ]);
    emitNet("teleportRequest", coords);
  }
});
