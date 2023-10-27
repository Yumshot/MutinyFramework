/**
 * Closes the NUI completely by sending a "RESET" event and removing focus from the NUI.
 */
export const CloseNuiCompletely = () => {
  SendNUIMessage({
    event: "RESET",
  });
  SetNuiFocus(false, false);
  SetNuiFocusKeepInput(false);
};
