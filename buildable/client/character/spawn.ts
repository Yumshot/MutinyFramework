/**
 * This module handles the spawning of player characters in the game world.
 * It exports the following:
 * - `CHAR_VALS`: A nullable object of type `CharacterValues` that holds the character data of the player.
 * - `DEFAULT_SPAWN`: A constant object of type `SpawnLocation` that holds the default spawn location of the player.
 * - `firstSpawn()`: An async function that spawns the player character in the game world.
 * - `openCharacterCreator(identifiers: CharacterValues | null)`: A function that opens the character creator UI.
 * - `setNuiFocus()`: A function that sets the NUI focus.
 *
 * @remarks
 * This module listens to the following events:
 * - `MUTINY:CORE:CLIENT:SPAWN_HANDLER`: An event that sets the `CHAR_VALS` object with the character data of the player.
 * - `onClientGameTypeStart`: An event that triggers the spawning of the player character.
 * - `MUTINY:CORE:CLIENT:OPEN_CHARACTER_SELECTOR`: An event that opens the character selector UI.
 *
 * @packageDocumentation
 */

// Importing the `Delay` function from the `utils/functions` module.
import { Delay } from "utils/functions";
import { CharacterValues } from "interfaces/Character";
import { Location } from "interfaces/Location";

// Initializing the `CHAR_VALS` variable as `null`.
let CHAR_VALS: CharacterValues | null = null;

// Defining the `DEFAULT_SPAWN` constant object.
let DEFAULT_SPAWN: Location = { x: 7614.787, y: 1064.8, z: 1678.407 };

export let CAM_FOR_CHARACTER_SELECT: any;
// Exporting the `CHAR_VALS`, `DEFAULT_SPAWN`, `firstSpawn()`, `openCharacterCreator()`, and `setNuiFocus()` functions.
const exp = global.exports;
// Listening to the `MUTINY:CORE:CLIENT:SPAWN_HANDLER` event. !NOTE: MUTINY:CORE:CLIENT:SPAWN:SET_DATA
onNet("MUTINY:CORE:CLIENT:SPAWN:SET_DATA", (options: CharacterValues) => {
  CHAR_VALS = options;
});

// Listening to the `onClientGameTypeStart` event.
on("onClientGameTypeStart", async () => {
  // If `CHAR_VALS` is `null`, wait for 500ms and return.
  if (!CHAR_VALS) {
    await Delay(500);
    return;
  }
  console.log("MUTINY:CORE:CLIENT:SPAWN:SET_DATA (CHAR_VALS)", CHAR_VALS);

  // If it's the player's first join, call the `firstSpawn()` function.
  if (CHAR_VALS.first_join) {
    await firstSpawn();
  } else {
    // Otherwise, emit the `MUTINY:CORE:SERVER:SPAWN_IMPORT` event with `CHAR_VALS`.
    emitNet("MUTINY:CORE:SERVER:CHARACTER:SPAWN:SET_DATA", CHAR_VALS);
  }
});

/**
 * Spawns the player character in the game world.
 * If there are no existing characters, the player is spawned at the default location with the default model.
 * Otherwise, the player is spawned at the last location of the first character in the `CHAR_VALS` array with their model.
 * After the player is spawned, their entity is made invisible to the network and frozen in place.
 * Finally, the character creator UI is opened.
 */
async function firstSpawn() {
  // Define the `spawnPlayerOptions` object.
  let spawnPlayerOptions: { x: any; y: any; z: any; model: string };

  // If there are no existing characters, spawn the player at the default location with the default model.
  if (CHAR_VALS.characters.length === 0) {
    spawnPlayerOptions = {
      x: DEFAULT_SPAWN.x,
      y: DEFAULT_SPAWN.y,
      z: DEFAULT_SPAWN.z,
      model: "mp_m_freemode_01",
    };
  } else {
    // Otherwise, spawn the player at the last location of the first character in the `CHAR_VALS` array with their model.
    spawnPlayerOptions = {
      x: CHAR_VALS.characters[0].last_location.x,
      y: CHAR_VALS.characters[0].last_location.y,
      z: CHAR_VALS.characters[0].last_location.z,
      model: CHAR_VALS.characters[0].model.model,
    };
  }

  // Define the `afterSpawn` function.
  const afterSpawn = () => {
    const ped = PlayerPedId();
    NetworkSetEntityInvisibleToNetwork(ped, true);
    FreezeEntityPosition(ped, true);
    openCharacterCreator(CHAR_VALS);
  };

  // Set the auto-spawn callback to spawn the player with `spawnPlayerOptions` and call `afterSpawn()` after spawning.
  exp.spawnmanager.setAutoSpawnCallback(() => {
    exp.spawnmanager.spawnPlayer(spawnPlayerOptions, afterSpawn);
  });

  // Enable auto-spawning and force a respawn.
  exp.spawnmanager.setAutoSpawn(true);
  exp.spawnmanager.forceRespawn();
}

// Define the `openCharacterCreator()` function.
function openCharacterCreator(identifiers: CharacterValues | null) {
  SendNUIMessage({
    event: "OPEN_CHARACTER_CREATOR",
    identifiers: identifiers,
  });
  setNuiFocus();
}

// Define the `setNuiFocus()` function.
function setNuiFocus() {
  SetNuiFocus(true, true);
  SetNuiFocusKeepInput(false);
}

// Listening to the `MUTINY:CORE:CLIENT:OPEN_CHARACTER_SELECTOR` event. !NOTE: MUTINY:CORE:CLIENT:SPAWN:OPEN_CHARACTER_SELECTOR
onNet(
  "MUTINY:CORE:CLIENT:SPAWN:OPEN_CHARACTER_SELECTOR",
  async (characters: any) => {
    ShutdownLoadingScreen();
    ShutdownLoadingScreenNui();
    exp.spawnmanager.spawnPlayer(
      {
        x: 0,
        y: 0,
        z: 0,
        model: "a_m_m_skater_01",
      },
      async () => {
        SetCloudHatOpacity(0.1);

        CAM_FOR_CHARACTER_SELECT = CreateCam("DEFAULT_SCRIPTED_CAMERA", true);
        SetCamCoord(CAM_FOR_CHARACTER_SELECT, 7614.787, 1064.8, 1678.407);
        PointCamAtCoord(CAM_FOR_CHARACTER_SELECT, 7614.787, 1064.8, 1678.407);
        SetCamActive(CAM_FOR_CHARACTER_SELECT, true);
        RenderScriptCams(true, true, 1, true, false);
        await Delay(2500);
        SendNUIMessage({
          event: "OPEN_CHARACTER_SELECT",
          characters: characters,
        });

        await Delay(100);
        setNuiFocus();
      }
    );
  }
);
