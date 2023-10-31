onNet("deleteVehicle", async () => {
  const player = PlayerPedId();
  const vehicle = GetVehiclePedIsIn(player, false);
  if (!IsEntityAVehicle(vehicle)) return console.log("Not a vehicle");
  SetEntityAsMissionEntity(vehicle, true, true);
  DeleteVehicle(vehicle);
  console.log("Vehicle Deleted");
});
