import { SendCharacterSelect } from "modules/nui/characterSelect";
import { SendCharacterCreate } from "modules/nui/createCharacter";

/**
 * Event listener for the "startSpawn" network event.
 * @param {Array} characters - An array of player characters.
 */
let __playerCharacters: any = [];

/**
 * The target character.
 * @type {Object}
 */
let __targetCharacter: any = {};

export function SetTargetCharacter(character: any) {
  __targetCharacter = character;
  StartCharacterSetup(__targetCharacter);
}

/**
 * Event listener for the "startSpawn" network event.
 * @param {Array} characters - An array of player characters.
 * @param {number} last - The index of the last player character.
 */

onNet("startSpawn", (characters: any) => {
  __playerCharacters = characters;
});

/**
 * Event listener for the "gameEventTriggered" event.
 * @param {any} name - The name of the triggered game event.
 * @param {Array} args - An array of arguments passed to the event.
 */

on("gameEventTriggered", async (name: any, args: any[]) => {
  if (name === "CEventNetworkStartMatch") {
    DisplayHud(false);
    DisplayRadar(false);
    console.log(__playerCharacters.length, __playerCharacters);
    // request model
    RequestModel("mp_m_freemode_01");
    while (!HasModelLoaded("mp_m_freemode_01")) {
      // use a promise to prevent crashing
      await new Promise((resolve) => {
        setTimeout(resolve, 100);
      });
    }
    SetPlayerModel(PlayerId(), "mp_m_freemode_01");

    if (__playerCharacters.length === 0) {
      // TODO: Create a new character.

      // const DEFAULT_SPAWN = { x: 7614.787, y: 1064.8, z: 1678.407 };
      // const DEFAULT_SPAWN = { x: 2737.96, y: -374.12, z: -47.99 };
      const DEFAULT_SPAWN = {
        x: 763.7538452148438,
        y: -817.4901123046875,
        z: 26.2974853515625,
      };
      SetNuiFocus(true, true);
      global.exports.spawnmanager.setAutoSpawnCallback(() => {
        global.exports.spawnmanager.spawnPlayer(
          {
            x: DEFAULT_SPAWN.x,
            y: DEFAULT_SPAWN.y,
            z: DEFAULT_SPAWN.z,

            model: "mp_m_freemode_01",
          },
          () => {
            SendCharacterCreate(true);
          }
        );
      });
      global.exports.spawnmanager.setAutoSpawn(true);
      global.exports.spawnmanager.forceRespawn();
    } else {
      // TODO: Send Character Select Screen. --> into Spawn Character.
      SetNuiFocus(true, true);
      SendCharacterSelect(__playerCharacters);
    }
  }
});

function StartCharacterSetup(character: any) {
  const exp = (global as any).exports;
  DoScreenFadeOut(0);
  const target = character.data.character;
  global.exports.spawnmanager.setAutoSpawnCallback(() => {
    global.exports.spawnmanager.spawnPlayer(
      {
        x: target.last_location.x,
        y: target.last_location.y,
        z: target.last_location.z,
        skipFade: true,
        model: target.appearance.model,
      },
      () => {
        exp["mutiny_appearance"].setPlayerAppearance(target.appearance);
        DoScreenFadeIn(2500);
      }
    );
  });
  global.exports.spawnmanager.setAutoSpawn(true);
  global.exports.spawnmanager.forceRespawn();
}

// onNet("reloadSpawnEvent", () => {
//   console.log("TRIGGERED");
//   DisplayHud(false);
//   DisplayRadar(false);
//   if (__playerCharacters.length === 0) {
//     // TODO: Create a new character.

//     // const DEFAULT_SPAWN = { x: 7614.787, y: 1064.8, z: 1678.407 };
//     // const DEFAULT_SPAWN = { x: 2737.96, y: -374.12, z: -47.99 };
//     const DEFAULT_SPAWN = {
//       x: 763.7538452148438,
//       y: -817.4901123046875,
//       z: 26.2974853515625,
//     };

//     global.exports.spawnmanager.setAutoSpawnCallback(() => {
//       global.exports.spawnmanager.spawnPlayer(
//         {
//           x: DEFAULT_SPAWN.x,
//           y: DEFAULT_SPAWN.y,
//           z: DEFAULT_SPAWN.z,

//           model: "Ghost",
//         },
//         () => {
//           SendCharacterCreate(true);
//         }
//       );
//     });
//     global.exports.spawnmanager.setAutoSpawn(true);
//     global.exports.spawnmanager.forceRespawn();
//   } else {
//     // TODO: Send Character Select Screen. --> into Spawn Character.
//     const DEFAULT_SPAWN = {
//       x: 763.7538452148438,
//       y: -817.4901123046875,
//       z: 26.2974853515625,
//     };

//     global.exports.spawnmanager.setAutoSpawnCallback(() => {
//       global.exports.spawnmanager.spawnPlayer(
//         {
//           x: DEFAULT_SPAWN.x,
//           y: DEFAULT_SPAWN.y,
//           z: DEFAULT_SPAWN.z,

//           model: "Ghost",
//         },
//         () => {
//           SendCharacterSelect(__playerCharacters);
//         }
//       );
//     });
//     global.exports.spawnmanager.setAutoSpawn(true);
//     global.exports.spawnmanager.forceRespawn();
//   }
// });
