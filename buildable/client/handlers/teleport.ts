import { Delay } from "utils/functions";

// The duration of the screen fade in and out when teleporting.
const FADE_DURATION = 10000;

/**
 * Handles the "MUTINY:CORE:CLIENT:HANDLE_TELEPORT" event, which teleports the player to the specified coordinates.
 * @param coords The coordinates to teleport the player to.
 */
onNet(
  "MUTINY:CORE:CLIENT:HANDLERS:TELEPORT",
  async (coords: { x: number; y: number; z: number; heading: number }) => {
    // Check if the coordinates are valid.
    if (!isValidCoords(coords)) {
      console.error("Invalid teleport coordinates:", coords);
      return;
    }

    // Get the player's ped.
    const ped = PlayerPedId();

    // Fade the screen out.
    DoScreenFadeOut(FADE_DURATION);

    // Freeze the player's position.
    FreezeEntityPosition(ped, true);

    // Wait for the teleport delay.
    await Delay(FADE_DURATION);

    // Make the player invincible.
    SetEntityInvincible(ped, true);

    // Teleport the player to the specified coordinates.
    SetEntityCoordsNoOffset(
      ped,
      coords.x,
      coords.y,
      coords.z,
      false,
      false,
      false
    );
    SetEntityHeading(ped, coords.heading);

    // Wait for the teleport delay.
    await Delay(FADE_DURATION);

    // Fade the screen back in.
    DoScreenFadeIn(FADE_DURATION);

    // Make the player vulnerable again.
    SetEntityInvincible(ped, false);

    // Unfreeze the player's position.
    FreezeEntityPosition(ped, false);
  }
);

/**
 * Checks if the given coordinates object is valid.
 * @param coords The coordinates object to check.
 * @returns True if the object is valid, false otherwise.
 */
function isValidCoords(coords: any): coords is { x: number; y: number; z: number; heading: number } {
  return (
    typeof coords === "object" &&
    coords !== null &&
    "x" in coords &&
    "y" in coords &&
    "z" in coords &&
    "heading" in coords
  );
}
