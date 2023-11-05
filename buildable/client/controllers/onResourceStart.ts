on("onClientResourceStart", async (resource: string) => {
  if (resource !== GetCurrentResourceName()) return;
  emitNet("getServerPeds");
  emitNet("getServerDoors");
});
