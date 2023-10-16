import { eVehicleModType } from "enums/VehicleMods";
import { Delay } from "utils/functions";

// let debugInfoEnabled = false;

let mods: any = [];
onNet("MUTINY:CORE:CLIENT:COMMAND:GET_VEHICLE_MODS", async () => {
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
    
  for (let i = 0; i < 13; i++) {
    if (DoesExtraExist(myVehicle, i)) {
      vehicleExtras[i] = IsVehicleExtraTurnedOn(myVehicle, i);
      if (vehicleExtras[i] === 1  && DoesExtraExist(myVehicle, i)) {
          console.log(
            i + " " + DoesExtraExist(myVehicle, i),
            vehicleExtras[i] === 1 && DoesExtraExist(myVehicle, i),
            IsVehicleExtraTurnedOn(myVehicle, i)
          );
          emit("MUTINY:CORE:CLIENT:HANDLERS:EVENTS:SET_VEHICLE_EXTRAS", myVehicle, Number(i), 0);
        }  
      }
    }

    const plate = GetVehicleNumberPlateText(myVehicle);
    const plateIndex = GetVehicleNumberPlateTextIndex(myVehicle);
    let livery = GetVehicleLivery(myVehicle);

    if (livery === -1 || GetVehicleMod(myVehicle, 48) !== -1) {
      livery = GetVehicleMod(myVehicle, 48);
    }

    let currentMods = {
      drift_tire: GetDriftTyresEnabled(myVehicle),
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

    const toUpgrade = [
      eVehicleModType.VMT_TURBO,
      eVehicleModType.VMT_ENGINE,
      eVehicleModType.VMT_GEARBOX,
    ];
    SetVehicleModKit(myVehicle, 0);
    for (let i = 0; i < 3; i++) {
      const modToApply = toUpgrade[i];
      const maxVar = GetNumVehicleMods(myVehicle, modToApply);
      ToggleVehicleMod(myVehicle, modToApply, true);
      SetVehicleMod(myVehicle, modToApply, maxVar - 1, false);
      SetVehicleColours(myVehicle, 12, 12);
      SetVehicleWindowTint(myVehicle, 1);
    }
  } else {
    //NOT IN VEHICLE
  }
});

onNet("forfi-debugtools:tppos", (pos: string[]) => {
  if (pos[0] && pos[1] && pos[2]) {
    tpToCoords(parseInt(pos[0]), parseInt(pos[1]), parseInt(pos[2]));
  }
});

onNet("forfi-debugtools:tpto", (pid: string) => {
  if (pid) {
    const targetPed = GetPlayerPed(GetPlayerFromServerId(parseInt(pid)));
    const targetCoords = GetEntityCoords(targetPed, true);
    tpToCoords(targetCoords[0], targetCoords[1], targetCoords[2] + 0.5);
  }
});

async function tpToCoords(x: number, y: number, z: number) {
  const playerPed = PlayerPedId();
  const myVehicle = GetVehiclePedIsIn(playerPed, false);
  let entityToFreeze = playerPed;
  if (DoesEntityExist(myVehicle) && IsEntityAVehicle(myVehicle)) {
    SetNetworkVehicleRespotTimer(VehToNet(myVehicle), 5000);
    entityToFreeze = myVehicle;
  }
  SetPedCoordsKeepVehicle(playerPed, x, y, z);
  FreezeEntityPosition(entityToFreeze, true);
  while (!HasCollisionLoadedAroundEntity(entityToFreeze)) {
    await Delay(100);
  }
  FreezeEntityPosition(entityToFreeze, false);
}

onNet("forfi-debugtools:tpwaypoint", async () => {
  const WaypointHandle = GetFirstBlipInfoId(8);
  if (DoesBlipExist(WaypointHandle)) {
    const waypointCoords = GetBlipInfoIdCoord(WaypointHandle);
    for (let height = 1; height < 1000; height++) {
      SetPedCoordsKeepVehicle(
        PlayerPedId(),
        waypointCoords[0],
        waypointCoords[1],
        height + 0.0
      );
      const [foundGround, zPos] = GetGroundZFor_3dCoord(
        waypointCoords[0],
        waypointCoords[1],
        height + 0.0,
        true
      );
      if (foundGround) {
        SetPedCoordsKeepVehicle(
          PlayerPedId(),
          waypointCoords[0],
          waypointCoords[1],
          zPos + 0.0
        );
        break;
      }
      await Delay(5);
    }
  }
});

onNet("forfi-debugtools:testsound", (args: string[]) => {
  if (args[0] && args[1]) {
    PlaySoundFrontend(-1, args[0], args[1], true);
  }
});

onNet("forfi-debugtools:getpos", () => {
  const pos = GetEntityCoords(PlayerPedId(), true);
  const heading = GetEntityHeading(PlayerPedId());
  const text =
    "x: " +
    pos[0].toFixed(2) +
    ", y: " +
    pos[1].toFixed(2) +
    ", z: " +
    pos[2].toFixed(2) +
    ", heading: " +
    heading.toFixed(2);
  console.log(text);
  // SendNuiMessage(
  //   JSON.stringify({
  //     action: "OPEN_TEXTBOX",
  //     text: text,
  //   })
  // );
  // SetNuiFocus(true, true);
});

onNet("forfi-debugtools:spawnVeh", async (model: string | number) => {
  const myVehicle = GetVehiclePedIsIn(PlayerPedId(), false);
  if (IsEntityAVehicle(myVehicle)) {
    SetEntityAsMissionEntity(myVehicle, true, true);
    DeleteEntity(myVehicle);
  }
  if (IsModelAVehicle(model)) {
    const playerPed = PlayerPedId();
    const playerPos = GetEntityCoords(PlayerPedId(), true);
    const myVehicle = await spawnVehicle(model, {
      x: playerPos[0],
      y: playerPos[1],
      z: playerPos[2],
      heading: GetEntityHeading(playerPed),
      network: true,
    });
    SetVehicleColours(myVehicle, 12, 12);
    SetVehicleWindowTint(myVehicle, 1);
    SetVehicleMod(myVehicle, 11, 3, true);
    SetVehicleMod(myVehicle, 12, 1, true);
    SetVehicleMod(myVehicle, 13, 1, true);
    SetVehicleMod(myVehicle, 15, 3, true);
    SetVehicleMod(myVehicle, 16, 4, true);
    SetVehicleMod(myVehicle, 18, 0, true);
    SetVehicleMod(myVehicle, 22, 0, true);
    SetVehicleMod(myVehicle, 46, 2, true);
    SetPedIntoVehicle(playerPed, myVehicle, -1);
  }
});

onNet("forfi-debugtools:getid", (steamId: string, licenseId: string) => {
  const text = steamId + "\n" + licenseId;
  console.log(text);
  // SendNuiMessage(
  //   JSON.stringify({
  //     action: "OPEN_TEXTBOX",
  //     text: text,
  //   })
  // );
  // SetNuiFocus(true, true);
});

let debugCamActive = false;
let debugCam: number;
let debugCamPos: any;
onNet("forfi-debugtools:debugcam", async () => {
  if (debugCamActive === false) {
    const playerPed = PlayerPedId();
    const playerPos = GetEntityCoords(PlayerPedId(), true);
    FreezeEntityPosition(playerPed, true);
    // CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", xPos, yPos, zPos, updownRot, circleRot, leftrightRot, fov, false, 2);
    debugCamPos = {
      x: playerPos[0],
      y: playerPos[1],
      z: playerPos[2],
      xRot: 0.0,
      yRot: 0.0,
      zRot: 0.0,
      fov: 45.0,
    };
    debugCam = CreateCamWithParams(
      "DEFAULT_SCRIPTED_CAMERA",
      debugCamPos.x,
      debugCamPos.y,
      debugCamPos.z,
      debugCamPos.xRot,
      debugCamPos.yRot,
      debugCamPos.zRot,
      debugCamPos.fov,
      false,
      2
    );
    SetCamActive(debugCam, true);
    RenderScriptCams(true, true, 1000, true, false);
    debugCamActive = true;
    while (debugCamActive) {
      await Delay(100);
      updateDebugCam();
    }
  } else {
    debugCamActive = false;
    RenderScriptCams(false, true, 1000, true, false);
    SetCamActive(debugCam, false);
    DestroyCam(debugCam, true);
    const playerPed = PlayerPedId();
    FreezeEntityPosition(playerPed, false);
  }
});



function updateDebugCam() {
  let newCam = CreateCamWithParams(
    "DEFAULT_SCRIPTED_CAMERA",
    debugCamPos.x,
    debugCamPos.y,
    debugCamPos.z,
    debugCamPos.xRot,
    debugCamPos.yRot,
    debugCamPos.zRot,
    debugCamPos.fov,
    false,
    2
  );
  SetCamActiveWithInterp(newCam, debugCam, 100, 0, 0);
  SetCamActive(debugCam, false);
  DestroyCam(debugCam, true);
  debugCam = newCam;
}

onNet("forfi-debugtools:campos", async () => {
  if (debugCamActive === true) {
    const text = JSON.stringify(debugCamPos);
    console.log(text);
    // SendNuiMessage(
    //   JSON.stringify({
    //     action: "OPEN_TEXTBOX",
    //     text: text,
    //   })
    // );
    // SetNuiFocus(true, true);
  }
});

onNet("forfi-debugtools:setcampos", async (args: string[]) => {
  if (debugCamActive === true) {
    if (args[0] && args[1] && args[2]) {
      debugCamPos = {
        x: parseFloat(args[0]),
        y: parseFloat(args[1]),
        z: parseFloat(args[2]),
        xRot: 0.0,
        yRot: 0.0,
        zRot: 0.0,
        fov: 45.0,
      };
    }
  }
});

onNet("MUTINY:CORE:CLIENT:COMMAND:REMOVE_VEHICLE", async () => {
  const myVehicle = GetVehiclePedIsIn(PlayerPedId(), false);
  if (IsEntityAVehicle(myVehicle)) {
    await removeVehicle(myVehicle);
  }
});

// RegisterNuiCallbackType("debugtools:close");
// on("__cfx_nui:debugtools:close", (data: any, cb: any) => {
//   SetNuiFocus(false, false);
// });

setImmediate(() => {
  emit("chat:addSuggestion", "/tppos", "Teleport to coords.", [
    { name: "x", help: "X coord." },
    { name: "y", help: "Y coord." },
    { name: "z", help: "Z coord." },
  ]);
  emit("chat:addSuggestion", "/tpto", "Teleport to player.", [
    { name: "id", help: "Player server id." },
  ]);
});

// setTick(() => {
//   if (IsControlJustReleased(1, 56)) {
//     debugInfoEnabled = !debugInfoEnabled;
//   }
//   if (debugInfoEnabled) {
//     const pos = GetEntityCoords(PlayerPedId(), true);
//     const heading = GetEntityHeading(PlayerPedId());
//     const text =
//       "X: " +
//       pos[0].toFixed(2) +
//       ", Y: " +
//       pos[1].toFixed(2) +
//       ", Z: " +
//       pos[2].toFixed(2) +
//       ", H: " +
//       heading.toFixed(2);
//     emit("showText", 0.75, 0.005, 0.3, text, 170, 170, 170, 255);
//   }
// });

async function spawnVehicle(
  modelHash: string | number,
  data: { x: any; y: any; z: any; heading: any; network: any },
  markAsNotNeeded = true
) {
  RequestModel(modelHash);
  while (!HasModelLoaded(modelHash)) {
    await Delay(100);
  }
  const myVehicle = CreateVehicle(
    modelHash,
    data.x,
    data.y,
    data.z,
    data.heading,
    data.network,
    false
  );
  if (markAsNotNeeded) {
    SetEntityAsNoLongerNeeded(myVehicle);
  }
  SetModelAsNoLongerNeeded(modelHash);
  return myVehicle;
}

async function removeVehicle(myVehicle: number) {
  SetEntityAsMissionEntity(myVehicle, true, true);
  DeleteEntity(myVehicle);
}
