/**
 * Creates a new vehicle in the world and sets the player as the driver.
 * @param source - The player ID requesting the vehicle.
 * @param args - The model of the vehicle to create.
 */
export function CreateWorldVehicle(source: string, args: any) {
  const model = args;
  const ped = GetEntityCoords(GetPlayerPed(source));
  const x = ped[0] - 1.5;
  const y = ped[1] - 1.5;
  const z = ped[2] + 1.5;

  const vehicle = CreateVehicle(
    GetHashKey(model),
    x,
    y,
    z,
    GetEntityHeading(GetPlayerPed(source)),
    true,
    true
  );
  SetEntityRoutingBucket(NetworkGetEntityFromNetworkId(vehicle), 1);
  SetVehicleColours(vehicle, 12, 12);
  TaskEnterVehicle(GetPlayerPed(source), vehicle, -1, -1, 1.0, 16, 0);
  Player(source).state.set("vehicle", vehicle, true);
  Player(source).state.set("fuel", 100, true);
  emitNet("spawnVehicle", source, vehicle);
}
