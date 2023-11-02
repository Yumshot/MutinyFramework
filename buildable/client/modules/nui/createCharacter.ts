export function SendCharacterCreate(toggle: boolean) {
  SetNuiFocus(toggle, toggle);
  SendNUIMessage({
    event: "__openRegister",
    state: toggle,
  });
}
RegisterNuiCallback("++CreateCharacter", async (data: any, cb: any) => {
  emitNet("CreateNewUserCharacter", data);
  console.log("NUI CALLBACK ", data);
  SetNuiFocus(false, false);
  cb("ok");
});
