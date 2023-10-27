const exp = global.exports;
let __playerCharacters: any = [];
let last: number = 0;
let __targetCharacter: any = {};

onNet("startSpawn", (characters: any, last: number) => {
  __playerCharacters = characters;
  last = last;
  __targetCharacter = __playerCharacters[last];
});

on("gameEventTriggered", (name: any, args: any[]) => {
  if (name === "CEventNetworkStartMatch") {
    if (__playerCharacters.length === 0) {
      // TODO: Create a new character.
      const DEFAULT_SPAWN = { x: 7614.787, y: 1064.8, z: 1678.407 };
      exp.spawnmanager.setAutoSpawnCallback(() => {
        exp.spawnmanager.spawnPlayer(
          {
            x: DEFAULT_SPAWN.x,
            y: DEFAULT_SPAWN.y,
            z: DEFAULT_SPAWN.z,
            model: "a_m_m_skater_01",
          },
          () => {}
        );
      });
      exp.spawnmanager.setAutoSpawn(true);
      exp.spawnmanager.forceRespawn();
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
  }
});
