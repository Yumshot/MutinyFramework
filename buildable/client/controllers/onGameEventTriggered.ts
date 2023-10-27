<<<<<<< HEAD
/**
 * An array of player characters.
 * @type {Array}
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
=======
const exp = global.exports;
let __playerCharacters: any = [];
let last: number = 0;
let __targetCharacter: any = {};

>>>>>>> b5e75a5 (refactor(client): move old files to old folder)
onNet("startSpawn", (characters: any, last: number) => {
  __playerCharacters = characters;
  last = last;
  __targetCharacter = __playerCharacters[last];
});

<<<<<<< HEAD
/**
 * Event listener for the "gameEventTriggered" event.
 * @param {any} name - The name of the triggered game event.
 * @param {Array} args - An array of arguments passed to the event.
 */
=======
>>>>>>> b5e75a5 (refactor(client): move old files to old folder)
on("gameEventTriggered", (name: any, args: any[]) => {
  if (name === "CEventNetworkStartMatch") {
    if (__playerCharacters.length === 0) {
      // TODO: Create a new character.
<<<<<<< HEAD
<<<<<<< HEAD
      const DEFAULT_SPAWN = { x: 7614.787, y: 1064.8, z: 1678.407 };
      global.exports.spawnmanager.setAutoSpawnCallback(() => {
        global.exports.spawnmanager.spawnPlayer(
=======
      const DEFAULT_SPAWN = { x: 7614.787, y: 1064.8, z: 1678.407 };
      exp.spawnmanager.setAutoSpawnCallback(() => {
        exp.spawnmanager.spawnPlayer(
>>>>>>> 908bf2c (chore(ui): add ui / might not use this.)
          {
            x: DEFAULT_SPAWN.x,
            y: DEFAULT_SPAWN.y,
            z: DEFAULT_SPAWN.z,
<<<<<<< HEAD
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
=======
=======
            model: "a_m_m_skater_01",
          },
          () => {
            console.log(__playerCharacters, last, __targetCharacter);
          }
        );
      });
      exp.spawnmanager.setAutoSpawn(true);
      exp.spawnmanager.forceRespawn();
>>>>>>> 908bf2c (chore(ui): add ui / might not use this.)
    } else {
      // TODO: Send Character Select Screen. --> into Spawn Character.
    }

    //   exp.spawnmanager.setAutoSpawnCallback(() => {
    //     exp.spawnmanager.spawnPlayer(
    //       {
    //         x: 686.245,
    //         y: 577.95,
    //         z: 130.461,
    //         model: "a_m_m_skater_01",
    //       },
    //       () => {
    //         emit("chat:addMessage", {
    //           args: ["Hi, there!"],
    //         });
    //       }
    //     );
    //   });
    //   exp.spawnmanager.setAutoSpawn(true);
    //   exp.spawnmanager.forceRespawn();
>>>>>>> b5e75a5 (refactor(client): move old files to old folder)
  }
});
