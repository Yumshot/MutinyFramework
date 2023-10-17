export const CloseNuiCompletely = () => {
  SendNUIMessage({
    event: "RESET",
  });
  SetNuiFocus(false, false);
  SetNuiFocusKeepInput(false);
};
