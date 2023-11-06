export function SendCharacterCreate(toggle: boolean) {
  SetNuiFocus(toggle, toggle);
  SendNUIMessage({
    event: "__openRegister",
    state: toggle,
  });
}
RegisterNuiCallback("++CreateCharacter", async (data: any, cb: any) => {
  const character = data;
  SendAppearance(character);
  SetNuiFocus(false, false);
  cb("ok");
});

const config = {
  ped: true,
  headBlend: true,
  faceFeatures: true,
  headOverlays: true,
  components: true,
  props: false,
  allowExit: false,
  tattoos: true,
};
function SendAppearance(character_data: any) {
  const exp = (global as any).exports;
  exp["mutiny_appearance"].startPlayerCustomization((appearance: any) => {
    if (appearance) {
      emitNet("CreateNewUserCharacter", {
        ...character_data,
        appearance: appearance,
      });
    }
  }, config);
}
