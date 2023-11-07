let CAM_TOGGLE = "F10";
let CAM_TOGGLED = false;

RegisterKeyMapping(
  "+cinematic",
  "Toggle Cinematic View",
  "KEYBOARD",
  CAM_TOGGLE
);
RegisterCommand(
  "+cinematic",
  () => {
    if (IsPauseMenuActive()) {
      return;
    }
    CAM_TOGGLED = !CAM_TOGGLED;
    SendNUIMessage({
      event: "__blackBars",
      state: CAM_TOGGLED,
    });
  },
  false
);
