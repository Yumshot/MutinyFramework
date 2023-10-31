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
    if (__playerCharacters.length === 0) {
      // TODO: Create a new character.

      const DEFAULT_SPAWN = { x: 7614.787, y: 1064.8, z: 1678.407 };

      global.exports.spawnmanager.setAutoSpawnCallback(() => {
        global.exports.spawnmanager.spawnPlayer(
          {
            x: DEFAULT_SPAWN.x,
            y: DEFAULT_SPAWN.y,
            z: DEFAULT_SPAWN.z,

            model: "Ghost",
          },
          () => {
            console.log(__playerCharacters, last, __targetCharacter);
          }
        );
      });
      global.exports.spawnmanager.setAutoSpawn(true);
      global.exports.spawnmanager.forceRespawn();
    } else {
      // TODO: Send Character Select Screen. --> into Spawn Character.
    }
  }
});
