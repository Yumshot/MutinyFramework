import { Delay } from "utils/functions";

// The duration of the screen fade in and out when teleporting.
const FADE_DURATION = 2500;

/**
 * Handles the "MUTINY:CORE:CLIENT:HANDLE_TELEPORT" event, which teleports the player to the specified coordinates.
 * @param coords The coordinates to teleport the player to.
 */
onNet(
  "MUTINY:CORE:CLIENT:HANDLERS:TELEPORT",
  async (coords: { x: number; y: number; z: number; heading: number }) => {
    // Check if the coordinates are valid.
    if (!isValidCoords(coords)) {
      emit("MUTINY:NOTIFY:CREATE_NOTIFY", {
        title: "System",
        text: "Invalid teleport coordinates!",
        color: "danger",
        position: "top-right",
      });
      console.error("Invalid teleport coordinates:", coords);
      return;
    }
    DoScreenFadeOut(10);

    // Get the player's ped.
    const ped = PlayerPedId();

    // Fade the screen out.

    SetEntityInvincible(ped, true);

    for (let height = 1; height < 1000; height++) {
      SetPedCoordsKeepVehicle(ped, coords.x, coords.y, height + 0.0);
      const [foundGround, zPos] = GetGroundZFor_3dCoord(
        coords.x,
        coords.y,
        height + 0.0,
        true
      );
      if (foundGround) {
        SetPedCoordsKeepVehicle(ped, coords.x, coords.y, zPos + 0.0);
        break;
      }
      await Delay(5);
    }

    // Fade the screen back in.
    DoScreenFadeIn(FADE_DURATION);

    // Make the player vulnerable again.
    SetEntityInvincible(ped, false);

    emit("MUTINY:NOTIFY:CREATE_NOTIFY", {
      title: "System",
      text: "Teleport Successful!",
      color: "dark",
      position: "top-right",
    });
  }
);

/**
 * Checks if the given coordinates object is valid.
 * @param coords The coordinates object to check.
 * @returns True if the object is valid, false otherwise.
 */
function isValidCoords(
  coords: any
): coords is { x: number; y: number; z: number; heading: number } {
  return (
    typeof coords === "object" &&
    coords !== null &&
    "x" in coords &&
    "y" in coords &&
    "z" in coords &&
    "heading" in coords
  );
}
