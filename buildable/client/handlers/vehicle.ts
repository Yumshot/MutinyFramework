import { eVehicleModType } from "enums/VehicleCustomization";

export const Speed = (vehicle: number) =>
  Math.floor(GetEntitySpeed(vehicle) * 2.236936);
export const Rpm = (vehicle: number) =>
  Math.floor(GetVehicleCurrentRpm(vehicle) * 100);

export const GetCurrentVehicleMods = () => {
  const myVehicle = GetVehiclePedIsIn(PlayerPedId(), true);
  if (IsEntityAVehicle(myVehicle) && DoesEntityExist(myVehicle)) {
    const [colorPrimary, colorSecondary] = GetVehicleColours(myVehicle);
    const [pearlescentColor, wheelColor] = GetVehicleExtraColours(myVehicle);
    const [neonR, neonG, neonB] = GetVehicleNeonLightsColour(myVehicle);
    const [tyreSmokeR, tyreSmokeG, tyreSmokeB] =
      GetVehicleTyreSmokeColor(myVehicle);
    const windowTint = GetVehicleWindowTint(myVehicle);
    const dashboardColor = GetVehicleDashboardColour(myVehicle);
    const trimColor = GetVehicleInteriorColour(myVehicle);
    const [r, g, b] = GetVehicleCustomPrimaryColour(myVehicle);
    const [r2, g2, b2] = GetVehicleCustomSecondaryColour(myVehicle);
    let vehicleExtras: any = {};

    for (let i = 0; i < 20; i++) {
      if (DoesExtraExist(myVehicle, i)) {
        vehicleExtras[i] = IsVehicleExtraTurnedOn(myVehicle, i);
      }
    }

    const plate = GetVehicleNumberPlateText(myVehicle);
    const plateIndex = GetVehicleNumberPlateTextIndex(myVehicle);
    let livery = GetVehicleLivery(myVehicle);

    if (livery === -1 || GetVehicleMod(myVehicle, 48) !== -1) {
      livery = GetVehicleMod(myVehicle, 48);
    }

    let currentMods = {
      driftTire: GetDriftTyresEnabled(myVehicle),
      model: GetEntityModel(myVehicle),
      plate: plate,
      plateIndex: plateIndex,
      bodyHealth: Math.round(GetVehicleBodyHealth(myVehicle) * 10) / 10,
      engineHealth: Math.round(GetVehicleEngineHealth(myVehicle)),
      tankHealth: Math.round(GetVehiclePetrolTankHealth(myVehicle)),
      fuelLevel: Math.round(GetVehicleFuelLevel(myVehicle)),
      dirtLevel: Math.round(GetVehicleDirtLevel(myVehicle)),
      color1: colorPrimary,
      color2: colorSecondary,
      rgb: [r, g, b],
      rgb2: [r2, g2, b2],
      pearlescentColor: pearlescentColor,
      wheelColor: wheelColor,
      wheels: GetVehicleWheelType(myVehicle),
      windowTint: windowTint,
      dashboardColor: dashboardColor,
      trimColor: trimColor,
      xenonColor: GetVehicleXenonLightsColour(myVehicle),
      neonEnabled: [
        IsVehicleNeonLightEnabled(myVehicle, 0),
        IsVehicleNeonLightEnabled(myVehicle, 1),
        IsVehicleNeonLightEnabled(myVehicle, 2),
        IsVehicleNeonLightEnabled(myVehicle, 3),
      ],
      neonColor: [neonR, neonG, neonB],
      extras: vehicleExtras,
      tyreSmokeColor: [tyreSmokeR, tyreSmokeG, tyreSmokeB],
      modSpoilers: GetVehicleMod(myVehicle, 0),
      modFrontBumper: GetVehicleMod(myVehicle, 1),
      modRearBumper: GetVehicleMod(myVehicle, 2),
      modSideSkirt: GetVehicleMod(myVehicle, 3),
      modExhaust: GetVehicleMod(myVehicle, 4),
      modFrame: GetVehicleMod(myVehicle, 5),
      modGrille: GetVehicleMod(myVehicle, 6),
      modHood: GetVehicleMod(myVehicle, 7),
      modFender: GetVehicleMod(myVehicle, 8),
      modRightFender: GetVehicleMod(myVehicle, 9),
      modRoof: GetVehicleMod(myVehicle, 10),
      modEngine: GetVehicleMod(myVehicle, 11),
      modBrakes: GetVehicleMod(myVehicle, 12),
      modTransmission: GetVehicleMod(myVehicle, 13),
      modHorns: GetVehicleMod(myVehicle, 14),
      modSuspension: GetVehicleMod(myVehicle, 15),
      modArmor: GetVehicleMod(myVehicle, 16),
      modFrontWheels: GetVehicleMod(myVehicle, 23),
      modBackWheels: GetVehicleMod(myVehicle, 24),
      modPlateHolder: GetVehicleMod(myVehicle, 25),
      modVanityPlate: GetVehicleMod(myVehicle, 26),
      modTrimA: GetVehicleMod(myVehicle, 27),
      modOrnaments: GetVehicleMod(myVehicle, 28),
      modDashboard: GetVehicleMod(myVehicle, 29),
      modDial: GetVehicleMod(myVehicle, 30),
      modDoorSpeaker: GetVehicleMod(myVehicle, 31),
      modSeats: GetVehicleMod(myVehicle, 32),
      modSteeringWheel: GetVehicleMod(myVehicle, 33),
      modShifterLeavers: GetVehicleMod(myVehicle, 34),
      modAPlate: GetVehicleMod(myVehicle, 35),
      modSpeakers: GetVehicleMod(myVehicle, 36),
      modTrunk: GetVehicleMod(myVehicle, 37),
      modHydrolic: GetVehicleMod(myVehicle, 38),
      modEngineBlock: GetVehicleMod(myVehicle, 39),
      modAirFilter: GetVehicleMod(myVehicle, 40),
      modStruts: GetVehicleMod(myVehicle, 41),
      modArchCover: GetVehicleMod(myVehicle, 42),
      modAerials: GetVehicleMod(myVehicle, 43),
      modTrimB: GetVehicleMod(myVehicle, 44),
      modTank: GetVehicleMod(myVehicle, 45),
      modWindows: GetVehicleMod(myVehicle, 46),
      modLivery: livery,
      modTurbo: IsToggleModOn(myVehicle, 18) ? 0 : -1,
      modSmokeEnabled: IsToggleModOn(myVehicle, 20) ? 0 : -1,
      modXenon: IsToggleModOn(myVehicle, 22) ? 0 : -1,
    };
    return currentMods;
  }
};

export const GetAvailableVehicleMods = () => {
  const myVehicle = GetVehiclePedIsIn(PlayerPedId(), false);
  let availableMods: any;
  const maxEnum = Math.max.apply(null, Object.values(eVehicleModType));

  for (let i = 0; i < maxEnum; i++) {
    const modTarget = GetNumVehicleMods(myVehicle, i);
    if (modTarget > 0) {
      availableMods[i] = modTarget;
    } else {
      availableMods[i] = 0;
    }
  }
  return availableMods;
};
