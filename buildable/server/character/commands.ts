import { DATABASE_COLLECTION_USERS } from "database/init";
import { Delay, findSteam } from "utils/functions";

RegisterCommand(
  "tppos",
  (source: any, args: any, raw: any) => {
    emitNet(
      "MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:TELEPORT_TO_POS",
      source,
      args
    );
  },
  true
);

RegisterCommand(
  "tpm",
  (source: any, args: any, raw: any) => {
    emitNet("MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:TELEPORT_TO_WP", source);
  },
  true
);

RegisterCommand(
  "car",
  (source: any, args: any[], raw: any) => {
    if (args[0]) {
      emitNet(
        "MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:ADMIN_CAR_SPAWN",
        source,
        args[0]
      );
    }
  },
  true
);

RegisterCommand(
  "getid",
  (source: any, args: any, raw: any) => {
    const player = source;
    let steamId;
    let licenseId;
    for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
      let tempid = GetPlayerIdentifier(player, i);
      console.log(tempid);
      if (tempid.includes("steam")) {
        steamId = tempid;
      } else if (tempid.includes("license")) {
        licenseId = tempid;
      }
    }
    emitNet("MUTINY:CORE:CLIENT:COMMAND:GET_ID", source, steamId, licenseId);
  },
  false
);

RegisterCommand(
  "dv",
  (source: any, args: any, raw: any) => {
    emitNet("MUTINY:CORE:CLIENT:COMMAND:REMOVE_VEHICLE", source);
  },
  false
);

RegisterCommand(
  "vmods",
  (source: any, args: any, raw: any) => {
    emitNet("MUTINY:CORE:CLIENT:COMMAND:GET_VEHICLE_MODS", source);
  },
  false
);

RegisterCommand(
  "ap",
  (source: any, args: any, raw: any) => {
    emitNet(
      "MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:START_AUTO_PILOT",
      source,
      args[0]
    );
  },
  false
);

RegisterCommand(
  "aps",
  (source: any, args: any, raw: any) => {
    emitNet("MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:STOP_AUTOPILOT", source);
  },
  false
);

RegisterCommand(
  "n-test-success",
  (source: any, args: any, raw: any) => {
    console.log("test success");
    emitNet("MUTINY:CORE:CLIENT:COMMAND:NOTIFICATION", source);
  },
  false
);

RegisterCommand(
  "test-reset",
  async (source: any, args: any, raw: any) => {
    const player = source;
    const steam = findSteam(player);
    const user = await DATABASE_COLLECTION_USERS.findOne(steam);
    emitNet("MUTINY:CORE:SERVER:CHARACTER:SPAWN:SET_DATA", user);
    await Delay(500);
    emitNet(
      "MUTINY:CORE:CLIENT:SPAWN:OPEN_CHARACTER_SELECTOR",
      source,
      user.characters
    );
  },
  false
);

RegisterCommand(
  "cped",
  (source: any, args: any, raw: any) => {
    emitNet("MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:CLEAR_ALL_PEDS", source);
  },
  false
);

// RegisterCommand(
//   "fped",
//   (source: any, args: any, raw: any) => {
//     emitNet("MUTINY:CORE:CLIENT:HANDLERS:COMMANDS:GET_CLOSEST_PED", source);
//   },
//   false
// );
