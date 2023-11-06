import { Vector3 } from "classes/Vector3";
import { Delay } from "modules/utils/delay";

/**
 * Listens for the "teleportToMarker" event and teleports the player to the location of their waypoint marker.
 * Emits the "teleportRequest" event with the coordinates of the waypoint marker.
 */

onNet("teleportToMarker", async () => {
  const WaypointHandle = GetFirstBlipInfoId(8);
  if (DoesBlipExist(WaypointHandle)) {
    console.log("BLIP EXISTS");
    const waypointCoords = GetBlipInfoIdCoord(WaypointHandle);
    for (let height = 1; height < 1000; height++) {
      const [foundGround, zPos] = GetGroundZFor_3dCoord(
        waypointCoords[0],
        waypointCoords[1],
        height + 0.0,
        false
      );
      if (foundGround) {
        const coords = new Vector3([
          waypointCoords[0],
          waypointCoords[1],
          zPos,
        ]);
        emitNet("teleportRequest", coords);
        break;
      } else {
        const coords = new Vector3([
          waypointCoords[0],
          waypointCoords[1],
          height,
        ]);
        emitNet("teleportRequest", coords);
      }
      await Delay(5);
    }
  }
});
