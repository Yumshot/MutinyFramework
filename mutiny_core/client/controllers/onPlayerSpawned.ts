on("playerSpawned", () => {
  emitNet("getServerPeds");
});
