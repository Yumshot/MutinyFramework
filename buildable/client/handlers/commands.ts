import {
  Delay,
  RemoveVehicle,
  SpawnVehicle,
  TpToCoords,
} from "utils/functions";
import { INotification } from "../interfaces/Notification";

import { DEFAULTS } from "../../common/globals";
let isAutoPilotActive = false;
setTick(async () => {
  await Delay(7500);
  if (isAutoPilotActive) {
    const ped = PlayerPedId();
    const [x, y, z] = GetEntityCoords(ped, true);
    const blip = GetFirstBlipInfoId(8);
    const [blipX, blipY, blipZ] = GetBlipCoords(blip);
    const distance = Vdist(x, y, z, blipX, blipY, blipZ);
    if (distance <= 10.0) {
      let speedModifier = 19.0;
      const vehicle = GetVehiclePedIsIn(ped, false);
      ClearPedTasks(ped);
      for (let i = 19.0; i > 0.0; i--) {
        SetVehicleForwardSpeed(vehicle, i);
        await Delay(200);
        speedModifier = i;
      }
      if (speedModifier <= 0.0) {
        emitNet("MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:STOP_AUTOPILOT");
      }
    }
  }
});

onNet("MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:STOP_AUTOPILOT", () => {
  if (!isAutoPilotActive) return;
  const ped = PlayerPedId();
  const vehicle = GetVehiclePedIsIn(ped, false);
  ClearPedTasks(ped);

  isAutoPilotActive = false;
});

onNet(
  "MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:START_AUTO_PILOT",
  async (level: number) => {
    const ped = PlayerPedId();
    ClearPedTasks(ped);
    const vehicle = GetVehiclePedIsIn(ped, false);
    const blip = GetFirstBlipInfoId(8);
    const driveModeModifier = [524863, 447];
    const speedModifier = [
      DEFAULTS.AUTOPILOT_SPEED_1,
      DEFAULTS.AUTOPILOT_SPEED_2,
    ];

    if (DoesBlipExist(blip)) {
      const [x, y, z] = GetBlipCoords(blip);
      TaskVehicleDriveToCoordLongrange(
        ped,
        vehicle,
        x,
        y,
        z,
        speedModifier[level],
        driveModeModifier[level],
        1.0
      );
      isAutoPilotActive = true;
    } else {
      console.log("Give me a waypoint to drive to!");
    }
  }
);

onNet(
  "MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:TELEPORT_TO_POS",
  (pos: string[]) => {
    if (pos[0] && pos[1] && pos[2]) {
      TpToCoords(parseInt(pos[0]), parseInt(pos[1]), parseInt(pos[2]));
    }
  }
);

onNet("MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:TELEPORT_TO_WP", async () => {
  const WaypointHandle = GetFirstBlipInfoId(8);
  if (DoesBlipExist(WaypointHandle)) {
    const waypointCoords = GetBlipInfoIdCoord(WaypointHandle);
    console.log("HERE");
    emit("MUTINY:CORE:CLIENT:HANDLERS:TELEPORT", {
      x: waypointCoords[0],
      y: waypointCoords[1],
      z: waypointCoords[2],
      heading: 10,
    });
  }
});

onNet(
  "MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:ADMIN_CAR_SPAWN",
  async (model: string | number) => {
    const myVehicle = GetVehiclePedIsIn(PlayerPedId(), false);
    if (IsEntityAVehicle(myVehicle)) {
      SetEntityAsMissionEntity(myVehicle, true, true);
      DeleteEntity(myVehicle);
    }
    if (IsModelAVehicle(model)) {
      const playerPed = PlayerPedId();
      const playerPos = GetEntityCoords(PlayerPedId(), true);
      const myVehicle = await SpawnVehicle(model, {
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
  }
);

onNet(
  "MUTINY:CORE:CLIENT:COMMAND:GET_ID",
  (steamId: string, licenseId: string) => {
    const text = steamId + "\n" + licenseId;
    console.log(text);
  }
);

onNet("MUTINY:CORE:CLIENT:COMMAND:REMOVE_VEHICLE", async () => {
  const myVehicle = GetVehiclePedIsIn(PlayerPedId(), false);
  if (IsEntityAVehicle(myVehicle)) {
    RemoveVehicle(myVehicle);
  }
});

setImmediate(() => {
  emit("chat:addSuggestion", "/tppos", "Teleport to coords.", [
    { name: "x", help: "X coord." },
    { name: "y", help: "Y coord." },
    { name: "z", help: "Z coord." },
  ]);
  emit("chat:addSuggestion", "/tpto", "Teleport to player.", [
    { name: "id", help: "Player server id." },
  ]);
  emit("chat:addSuggestion", "/tpm", "Teleport to waypoint.");
  emit("chat:addSuggestion", "/dv", "Delete vehicle.");
  emit("chat:addSuggestion", "/vmods", "Get vehicle modkit.");
  emit("chat:addSuggestion", "/debugcam", "Toggle debug camera.");
  emit("chat:addSuggestion", "/campos", "Get debug camera position.");
  emit("chat:addSuggestion", "/setcampos", "Set debug camera position.", [
    { name: "x", help: "X coord." },
    { name: "y", help: "Y coord." },
    { name: "z", help: "Z coord." },
  ]);
  emit("chat:addSuggestion", "/getid", "Get steam and license id.");
  emit("chat:addSuggestion", "/testsound", "Test sound.", [
    { name: "sound", help: "Sound name." },
    { name: "set", help: "Sound set." },
  ]);
  emit("chat:addSuggestion", "/getpos", "Get player position.");
  emit("chat:addSuggestion", "/id", "Get player identity.");
  emit("chat:addSuggestion", "/loc", "Get player location.");
  emit("chat:addSuggestion", "/ap", "Start autopilot.", [
    { name: "level", help: "Autopilot level. [0 | 1]" },
  ]);
  emit("chat:addSuggestion", "/aps", "Stop autopilot.");
  emit("chat:addSuggestion", "/car", "Spawn admin car.", [
    { name: "model", help: "Vehicle model." },
  ]);
});

onNet("MUTINY:CORE:CLIENT:COMMAND:NOTIFICATION", () => {
  const notification: INotification = {
    title: "SOME TEST SHIT",
    text: "SOME TEXT TEST SHIT",
    color: "primary",
    position: "center-right",
    sticky: true,
  };
  emit("MUTINY:NOTIFY:CREATE_NOTIFY", notification);
});
