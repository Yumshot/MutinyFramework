import { Delay } from "modules/utils/delay";

onNet("spawnVehicle", async () => {
  const player = PlayerPedId();
  await Delay(1000);
  const netPlayerVehicle = Player(PedToNet(player)).state.fuel;
  console.log(netPlayerVehicle);
  const vehicle = GetVehiclePedIsIn(player, false);
  if (!IsEntityAVehicle(vehicle)) return console.log("Not a vehicle");
  SetVehicleModKit(vehicle, 0);
  SetVehicleColours(vehicle, 9, 9);
  SetVehicleWindowTint(vehicle, 1);
  SetVehicleMod(vehicle, 11, 3, true);
  SetVehicleMod(vehicle, 12, 1, true);
  SetVehicleMod(vehicle, 13, 1, true);
  SetVehicleMod(vehicle, 15, 3, true);
  SetVehicleMod(vehicle, 16, 4, true);
  SetVehicleMod(vehicle, 18, 0, true);
  SetVehicleMod(vehicle, 22, 0, true);
  SetVehicleMod(vehicle, 46, 2, true);
});
