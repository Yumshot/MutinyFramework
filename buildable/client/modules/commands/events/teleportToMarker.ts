import { Vector3 } from "classes/Vector3";

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
