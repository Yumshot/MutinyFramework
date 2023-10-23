import {
  CalculateDistance,
  Delay,
  RemoveVehicle,
  SpawnVehicle,
  TpToCoords,
} from "utils/functions";
import { INotification } from "../../common/interfaces/Notification";
import { DEFAULTS, LOCALES } from "../../common/globals";
import { JOB_NPCS } from "./peds";

let isAutoPilotActive = false;
let isRaycasting = false;
let hasSentNotification = false;
let lastTargetHit: any;
let hasFiredStartEvent = false;
let CAM_TOGGLE = "F10";
let CAM_TOGGLED = false;

RegisterKeyMapping(
  "+cinematic",
  "Toggle Cinematic View",
  "KEYBOARD",
  CAM_TOGGLE
);
RegisterCommand(
  "+cinematic",
  () => {
    if (IsPauseMenuActive()) {
      return;
    }
    CAM_TOGGLED = !CAM_TOGGLED;
    SendNUIMessage({
      event: "BLK_BAR",
      state: CAM_TOGGLED,
    });
  },
  false
);
let timer = 1000;
setTick(async () => {
  timer = 1000;
  if (IsPauseMenuActive()) {
    CAM_TOGGLED = false;
    SendNUIMessage({
      event: "BLK_BAR",
      state: CAM_TOGGLED,
    });
    return;
  }
  if (isAutoPilotActive) {
    timer = 1000;
    const ped = PlayerPedId();
    const vehicle = GetVehiclePedIsIn(ped, false);
    const blip = GetFirstBlipInfoId(8);
    const [x, y, z] = GetBlipCoords(blip);
    const entity = GetEntityCoords(vehicle, true);
    const distance = CalculateDistance(
      x,
      y,
      z,
      entity[0],
      entity[1],
      entity[2]
    );
    if (distance <= 50.0) {
      timer = 0;
      emit("MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:STOP_AUTOPILOT", true);
    }
  }
  await Delay(timer);
});

setInterval(() => {
  if (
    hasSentNotification &&
    lastTargetHit.npc.availableWork &&
    lastTargetHit.npc.currentJobs.length != lastTargetHit.npc.jobLimit &&
    !isRaycasting &&
    !hasFiredStartEvent
  ) {
    if (IsControlJustPressed(0, 38)) {
      emitNet(
        "MUTINY:CORE:SERVER:CHARACTER:JOBS:ELIGIBLE_CHECK",
        lastTargetHit
      );
      hasFiredStartEvent = true;
      const notification: INotification = {
        title:
          `[${lastTargetHit.npc.title}]` +
          " " +
          lastTargetHit.npc.bio.first +
          " " +
          lastTargetHit.npc.bio.last,
        text: "Alright, let me see what ive got for ya.",
        position: "top-right",
        sticky: true,
        width: "auto",
        progress: "auto",
        icon: LOCALES.NOTIFICATIONS.DOCK_WORKER_ICON,
      };
      emit("MUTINY:NOTIFY:CREATE_NOTIFY", notification);
    }
  }
  if (!isRaycasting) return;
  const ped = PlayerPedId();
  const [x, y, z] = GetEntityCoords(ped, true);
  const rayCast = StartShapeTestCapsule(
    x,
    y,
    z + 0.5,
    x,
    y,
    z,
    1.25,
    10,
    ped,
    7
  );
  const [, hit, , , entityHit] = GetShapeTestResult(rayCast);
  if (!hit || !entityHit) return;
  // create a visual line between the player and the closest ped this has to be run on a setTick
  // if (IsEntityAVehicle(entityHit)) {
  //   console.log("hit a vehicle");
  //   SetEntityAsMissionEntity(entityHit, true, true);
  //   DeleteEntity(entityHit);
  // }
  // Find Entity Head
  const head = GetPedBoneCoords(entityHit, 31086, 0, 0, 0);
  DrawLine(x, y, z, head[0], head[1], head[2], 0, 0, 255, 255);
  const closestPed = entityHit;

  JOB_NPCS.forEach((npc) => {
    if (npc.ped === closestPed) {
      if (!hasSentNotification) {
        hasSentNotification = true;
        const notification: INotification = {
          title: npc.title,
          text: "You looking for some work?",
          position: "top-center",
          sticky: true,
          width: "auto",
          progress: "auto",
          icon: LOCALES.NOTIFICATIONS.DOCK_WORKER_ICON,
        };
        emit("MUTINY:NOTIFY:CREATE_NOTIFY", notification);
        lastTargetHit = {
          ped: closestPed,
          npc: npc,
        };
      }
    } else {
      return;
    }
  });
}, 0);

RegisterKeyMapping(
  "+MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:GET_CLOSEST_PED",
  "TARGET",
  "keyboard",
  "LMENU"
);

// Set isRaycasting to false
RegisterCommand(
  "-MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:GET_CLOSEST_PED",
  () => {
    isRaycasting = false;
  },
  false
);

// Set isRaycasting to true
RegisterCommand(
  "+MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:GET_CLOSEST_PED",
  () => {
    isRaycasting = true;
  },
  false
);

// Clear all peds except the player's ped
onNet("MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:CLEAR_ALL_PEDS", () => {
  const peds = GetGamePool("CPed");
  for (let i = 0; i < peds.length; i++) {
    const ped = peds[i];
    if (ped !== PlayerPedId()) {
      DeleteEntity(ped);
    }
  }
});

// Stop autopilot if it is active
onNet(
  "MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:STOP_AUTOPILOT",
  (intercept: boolean) => {
    if (intercept) {
      const ped = PlayerPedId();
      const notification: INotification = {
        title: `Autism Autopilot`,
        text: "Arrived at Destination.",
        position: "top-right",
        sticky: true,
        width: "auto",
        progress: "auto",
      };
      emit("MUTINY:NOTIFY:CREATE_NOTIFY", notification);
      ClearPedTasks(ped);
      isAutoPilotActive = false;
      timer = 2500;
    } else {
      const ped = PlayerPedId();
      const notification: INotification = {
        title: `Autism Autopilot`,
        text: "Autopilot Cancelled.",
        position: "top-right",
        color: "danger",
        sticky: true,
        duration: 1000,
        width: "auto",
        progress: "auto",
      };
      emit("MUTINY:NOTIFY:CREATE_NOTIFY", notification);
      ClearPedTasks(ped);
      isAutoPilotActive = false;
      timer = 2500;
    }
  }
);

// Start autopilot to drive to a waypoint
onNet(
  "MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:START_AUTO_PILOT",
  async (level: number) => {
    const ped = PlayerPedId();
    ClearPedTasks(ped);
    const vehicle = GetVehiclePedIsIn(ped, false);
    const blip = GetFirstBlipInfoId(8);
    const driveModeModifier = DEFAULTS.AUTOPILOT_DRIVE_MODIFIERS;
    const speedModifier = [
      DEFAULTS.AUTOPILOT_SPEED_1,
      DEFAULTS.AUTOPILOT_SPEED_2,
    ];
    if (level > 1) level = 1;
    if (level < 0) level = 0;

    if (DoesBlipExist(blip)) {
      const notification: INotification = {
        title: `Autism Autopilot`,
        text: "Autopilot has been started, please do not leave the vehicle.",
        position: "top-right",
        sticky: true,
        width: "auto",
        progress: "auto",
      };
      emit("MUTINY:NOTIFY:CREATE_NOTIFY", notification);
      const [x, y, z] = GetBlipCoords(blip);
      SetDriverAbility(ped, 1.0);
      SetDriverAggressiveness(ped, 0.0);
      TaskVehicleDriveWander(
        ped,
        vehicle,
        speedModifier[level],
        driveModeModifier[level]
      );
      SetDriveTaskDrivingStyle(ped, driveModeModifier[level]);
      TaskVehicleDriveToCoordLongrange(
        ped,
        vehicle,
        x,
        y,
        z,
        speedModifier[level],
        driveModeModifier[level],
        5.0
      );
      isAutoPilotActive = true;
    } else {
      const notification: INotification = {
        title: `Autism Autopilot`,
        text: "Give me a waypoint to drive to!",
        position: "top-right",
        color: "danger",
        sticky: true,
        width: "auto",
      };
      emit("MUTINY:NOTIFY:CREATE_NOTIFY", notification);
    }
  }
);

// Teleport to a set of coordinates
onNet(
  "MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:TELEPORT_TO_POS",
  (pos: string[]) => {
    if (pos[0] && pos[1] && pos[2]) {
      TpToCoords(parseInt(pos[0]), parseInt(pos[1]), parseInt(pos[2]));
    }
  }
);

// Teleport to a waypoint
onNet("MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:TELEPORT_TO_WP", async () => {
  const WaypointHandle = GetFirstBlipInfoId(8);
  if (DoesBlipExist(WaypointHandle)) {
    const waypointCoords = GetBlipInfoIdCoord(WaypointHandle);
    emit("MUTINY:CORE:CLIENT:HANDLERS:TELEPORT", {
      x: waypointCoords[0],
      y: waypointCoords[1],
      z: waypointCoords[2],
      heading: 10,
    });
  }
});

// Spawn an admin car
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

// Get the player's Steam and license IDs
onNet(
  "MUTINY:CORE:CLIENT:COMMAND:GET_ID",
  (steamId: string, licenseId: string) => {
    const text = steamId + "\n" + licenseId;
    console.log(text);
  }
);

// Remove the player's current vehicle
onNet("MUTINY:CORE:CLIENT:COMMAND:REMOVE_VEHICLE", async () => {
  const myVehicle = GetVehiclePedIsIn(PlayerPedId(), false);
  if (IsEntityAVehicle(myVehicle)) {
    RemoveVehicle(myVehicle);
  }
});

// Set up chat suggestions for various commands
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

// Create a notification
onNet("MUTINY:CORE:CLIENT:COMMAND:NOTIFICATION", () => {
  const notification: INotification = {
    title: "SOME TEST SHIT",
    text: "SOME TEXT TEST SHIT",
    color: "primary",
    position: "bottom-center",
    sticky: true,
  };
  emit("MUTINY:NOTIFY:CREATE_NOTIFY", notification);
});
