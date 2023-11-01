let toggle = true;
RegisterCommand(
  "test",
  () => {
    SendNUIMessage({
      event: "__openRegister",
      state: toggle,
    });
    SetNuiFocus(toggle, toggle);
    toggle = !toggle;
  },
  false
);
