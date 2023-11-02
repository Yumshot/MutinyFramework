let toggle = true;
RegisterCommand(
  "test",
  () => {
    emitNet("getServerPeds");
  },
  false
);
