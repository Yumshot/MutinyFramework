RegisterCommand(
  "tppos",
  (source: any, args: any, raw: any) => {
    emitNet("forfi-debugtools:tppos", source, args);
  },
  true
);

RegisterCommand(
  "tpto",
  (source: any, args: any[], raw: any) => {
    emitNet("forfi-debugtools:tpto", source, args[0]);
  },
  true
);

RegisterCommand(
  "tpm",
  (source: any, args: any, raw: any) => {
    emitNet("forfi-debugtools:tpwaypoint", source);
  },
  true
);

RegisterCommand(
  "testsound",
  (source: any, args: any, raw: any) => {
    emitNet("forfi-debugtools:testsound", source, args);
  },
  false
);

RegisterCommand(
  "getpos",
  (source: any, args: any, raw: any) => {
    emitNet("forfi-debugtools:getpos", source);
  },
  false
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
    emitNet("forfi-debugtools:getid", source, steamId, licenseId);
  },
  false
);

RegisterCommand(
  "debugcam",
  (source: any, args: any, raw: any) => {
    emitNet("forfi-debugtools:debugcam", source);
  },
  true
);

RegisterCommand(
  "campos",
  (source: any, args: any, raw: any) => {
    emitNet("forfi-debugtools:campos", source);
  },
  true
);

RegisterCommand(
  "setcampos",
  (source: any, args: any, raw: any) => {
    emitNet("forfi-debugtools:setcampos", source, args);
  },
  true
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
