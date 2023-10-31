onNet("respawnPlayer", () => {
  const ped = PlayerPedId();
  const coords = GetEntityCoords(ped, false);
  const heading = GetEntityHeading(ped);

  global.exports.spawnmanager.spawnPlayer(
    {
      x: coords[0],
      y: coords[1],
      z: coords[2],
      heading: heading,
      model: GetEntityModel(ped),
      skipFade: false,
    },
    () => {
      emit("chat:addMessage", {
        args: ["Welcome back!"],
      });
    }
  );
});
