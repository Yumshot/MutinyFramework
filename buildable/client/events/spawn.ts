import { Delay } from "utils/functions";

let CHAR_VALS: any = null;
let DEFAULT_SPAWN: { x: number; y: number; z: number };
const exp = global.exports;

onNet(
  "MUTINY:CORE:CLIENT:SPAWN_HANDLER",
  (options: any, spawn_location: any) => {
    CHAR_VALS = options;
    DEFAULT_SPAWN = spawn_location;
  }
);

on("onClientGameTypeStart", async () => {
  if (CHAR_VALS == null) {
    await Delay(500);
    console.log(CHAR_VALS, " : CHARACTER");
  } else {
    console.log(CHAR_VALS, " FIRST JOIN VALUE CHECK");
    if (CHAR_VALS.first_join == false) {
      emitNet("MUTINY:CORE:SERVER:SPAWN_IMPORT", CHAR_VALS);
    } else {
      firstSpawn();
    }
  }
});

async function firstSpawn() {
  const DEFAULT_SPAWN = { x: 7614.787, y: 1064.8, z: 1678.407 };
    RequestModel("mp_m_freemode_01");
    while (!HasModelLoaded("mp_m_freemode_01")) {
      await Delay(500);
    }
  exp.spawnmanager.setAutoSpawnCallback(() => {
    exp.spawnmanager.spawnPlayer(
      {
        x: DEFAULT_SPAWN.x,
        y: DEFAULT_SPAWN.y,
        z: DEFAULT_SPAWN.z,
        model: "mp_m_freemode_01",
      },
      () => {
        const ped = PlayerPedId();
        //TODO: CREATE USER UI
        FreezeEntityPosition(ped, true);
        SendNUIMessage({
          event: "OPEN_CHARACTER_CREATOR",
          identifiers: CHAR_VALS,
        });
        SetNuiFocus(true, true);
        SetNuiFocusKeepInput(false);
      }
    );
  });

  exp.spawnmanager.setAutoSpawn(true);
  exp.spawnmanager.forceRespawn();
}

onNet("MUTINY:CORE:CLIENT:OPEN_CHARACTER_SELECTOR", async (characters: any) => {
  console.log("EMITTING");

  SendNUIMessage({
    event: "OPEN_CHARACTER_SELECT",
    characters: characters,
  });
  await Delay(100);
  SetNuiFocus(true, true);
  SetNuiFocusKeepInput(false);
});
