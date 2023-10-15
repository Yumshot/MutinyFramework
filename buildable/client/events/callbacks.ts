const exp = (global as any).exports;

RegisterNuiCallback("create_user_credentials", (data: any, cb: any) => {
    const context = data.data;
    const idents = data.identifiers;
    emitNet("MUTINY:CORE:SERVER:CREATE_FIRST_CHARACTER", [context, idents]);
    CLOSE_NUI_COMPLETELY();

});

const baseModels = ["mp_m_freemode_01","mp_f_freemode_01"];
onNet("MUTINY:CORE:CLIENT:REGISTERED_CHARACTER", (data: any) => {
   SetNuiFocus(false, false);
   const ped = PlayerPedId();
   FreezeEntityPosition(ped, false);
   if (data.sex === "Male") {
    exp["mutiny_appearance"].setPedModel(baseModels[0]);
   } else {
    exp["mutiny_appearance"].setPedModel(baseModels[1]);
   }
   const config = {
    ped: false,
    headBlend: true,
    faceFeatures: true,
    headOverlays: true,
    components: true,
    props: true,
    allowExit: false,
    tattoos: false
  }
   exp["mutiny_appearance"].startPlayerCustomization((appearance: any) => {
     if (appearance) {
       emitNet("MUTINY:CORE:SERVER:SAVE_CHARACTER_OUTFIT", 0, appearance);
     } else {
       return;
     }
   }, config);
})

RegisterNuiCallback("selected_character", (data: any, cb: any) => {
  const context = data.data;
  console.log(context, ' : NUI CALLBACK')
  emitNet("MUTINY:CORE:SERVER:SELECTED_CHARACTER", context);
});

onNet("MUTINY:CORE:CLIENT:LOAD_CHARACTER", (context: { last_location: { x: any; y: any; z: any; heading: number; }; model: { model: any; }; }) => {
    exp.spawnmanager.setAutoSpawnCallback(() => {
      exp.spawnmanager.spawnPlayer(
        {
          x: context.last_location.x,
          y: context.last_location.y,
          z: context.last_location.z,
          model: context.model.model,
        },
        () => {
          const ped = PlayerPedId();
          SetEntityHeading(ped, context.last_location.heading);
          CLOSE_NUI_COMPLETELY();
        }
      );
    });

    exp.spawnmanager.setAutoSpawn(true);
    exp.spawnmanager.forceRespawn();
});


export const CLOSE_NUI_COMPLETELY = () => {
   SendNUIMessage({
     event: "RESET",
   });
  SetNuiFocus(false, false);
}