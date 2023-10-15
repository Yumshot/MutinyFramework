let CHAR_VALS: any = null;
let DEFAULT_SPAWN: {x: number, y: number, z: number}
const exp = global.exports;

onNet("MUTINY:CORE:CLIENT:SPAWN_HANDLER", (options: any, spawn_location: any) => {
  CHAR_VALS = options;
  DEFAULT_SPAWN = spawn_location;
});

on("onClientGameTypeStart", () => {
  if (CHAR_VALS == null) {
    setTimeout(() => {
      console.log(CHAR_VALS, " : CHARACTER");
    }, 500);
  } else {
    console.log(CHAR_VALS, " FIRST JOIN VALUE CHECK")
    if (CHAR_VALS.first_join == false) {
      emitNet("MUTINY:CORE:SERVER:SPAWN_IMPORT", CHAR_VALS);
    } else {
      firstSpawn();
    }
  }
});

function firstSpawn() {
   exp.spawnmanager.setAutoSpawnCallback(() => {
     exp.spawnmanager.spawnPlayer(
       {
         x: DEFAULT_SPAWN.x,
         y: DEFAULT_SPAWN.y,
         z: DEFAULT_SPAWN.z,
         model: "a_m_m_hillbilly_01",
       },
       () => {
         const ped = PlayerPedId();
         SetEntityVisible(ped, false, false)
         NetworkSetEntityInvisibleToNetwork(ped, true);
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


onNet("MUTINY:CORE:CLIENT:OPEN_CHARACTER_SELECTOR", (characters: any) => {
  console.log("EMITTING")
  
   SendNUIMessage({
     event: "OPEN_CHARACTER_SELECT",
     characters: characters,
   });

   setTimeout(() => {
    SetNuiFocus(true, true);
    SetNuiFocusKeepInput(false);
   }, 5000);
})