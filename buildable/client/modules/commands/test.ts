let toggle = true;
RegisterCommand(
  "test",
  () => {
    SendNUIMessage({
      event: "__openRegister",
      state: toggle,
    });
    toggle = !toggle;
  },
  false
);
