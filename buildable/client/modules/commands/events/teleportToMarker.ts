import { Vector3 } from "classes/Vector3";

<<<<<<< HEAD
/**
 * Listens for the "teleportToMarker" event and teleports the player to the location of their waypoint marker.
 * Emits the "teleportRequest" event with the coordinates of the waypoint marker.
 */
=======
>>>>>>> 8a47bc5 (Add teleportToMarker event handler)
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
