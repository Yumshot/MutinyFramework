export function SendCharacterCreate(toggle: boolean) {
  SetNuiFocus(toggle, toggle);
  SendNUIMessage({
    event: "__openRegister",
    state: toggle,
  });
}

RegisterNuiCallbackType("__closeRegister");
on("__closeRegister", () => {
  SetNuiFocus(false, false);
});
