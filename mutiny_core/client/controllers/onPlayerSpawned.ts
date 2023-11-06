on("playerSpawned", () => {
  console.log("player spawned");
  emitNet("getServerPeds");
  emitNet("getServerDoors");
});
