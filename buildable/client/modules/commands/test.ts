import { SendCharacterCreate } from "modules/nui/createCharacter";

RegisterCommand(
  "test",
  (source: any, args: any, raw: any) => {
    // emitNet("getServerPeds");
    SendCharacterCreate(args[0]);
  },
  false
);
