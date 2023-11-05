import { SendCharacterSelect } from "modules/nui/characterSelect";
import { SendCharacterCreate } from "modules/nui/createCharacter";

/**
 * Event listener for the "startSpawn" network event.
 * @param {Array} characters - An array of player characters.
 * @param {number} last - The index of the last player character.
 */
let __playerCharacters: any = [];

/**
 * The index of the last player character.
 * @type {number}
 */
let last: number = 0;

/**
 * The target character.
 * @type {Object}
 */
let __targetCharacter: any = {};

/**
 * Event listener for the "startSpawn" network event.
 * @param {Array} characters - An array of player characters.
 * @param {number} last - The index of the last player character.
 */

onNet("startSpawn", (characters: any, last: number) => {
  __playerCharacters = characters;
  last = last;
  __targetCharacter = __playerCharacters[last];
});

/**
 * Event listener for the "gameEventTriggered" event.
 * @param {any} name - The name of the triggered game event.
 * @param {Array} args - An array of arguments passed to the event.
 */

on("gameEventTriggered", (name: any, args: any[]) => {
  if (name === "CEventNetworkStartMatch") {
    DisplayHud(false);
    DisplayRadar(false);
    if (__playerCharacters.length === 0) {
      // TODO: Create a new character.

      // const DEFAULT_SPAWN = { x: 7614.787, y: 1064.8, z: 1678.407 };
      // const DEFAULT_SPAWN = { x: 2737.96, y: -374.12, z: -47.99 };
      const DEFAULT_SPAWN = {
        x: 763.7538452148438,
        y: -817.4901123046875,
        z: 26.2974853515625,
      };

      global.exports.spawnmanager.setAutoSpawnCallback(() => {
        global.exports.spawnmanager.spawnPlayer(
          {
            x: DEFAULT_SPAWN.x,
            y: DEFAULT_SPAWN.y,
            z: DEFAULT_SPAWN.z,

            model: "Ghost",
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
      SendCharacterSelect(__playerCharacters, last, __targetCharacter);
    }
  }
});

onNet("reloadSpawnEvent", () => {
  console.log("TRIGGERED");
  DisplayHud(false);
  DisplayRadar(false);
  if (__playerCharacters.length === 0) {
    // TODO: Create a new character.

    // const DEFAULT_SPAWN = { x: 7614.787, y: 1064.8, z: 1678.407 };
    // const DEFAULT_SPAWN = { x: 2737.96, y: -374.12, z: -47.99 };
    const DEFAULT_SPAWN = {
      x: 763.7538452148438,
      y: -817.4901123046875,
      z: 26.2974853515625,
    };

    global.exports.spawnmanager.setAutoSpawnCallback(() => {
      global.exports.spawnmanager.spawnPlayer(
        {
          x: DEFAULT_SPAWN.x,
          y: DEFAULT_SPAWN.y,
          z: DEFAULT_SPAWN.z,

          model: "Ghost",
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
    SendCharacterSelect(__playerCharacters, last, __targetCharacter);
  }
});
