import { GATHER_USER_DATA_FOR_SERVER } from "old/database/functions";

onNet(
  "MUTINY:CORE:SERVER:CHARACTER:SPAWN:SET_DATA",
  async (identifiers: any) => {
    const src = source;
    const GATHERED_USER = await GATHER_USER_DATA_FOR_SERVER(src);
    emitNet(
      "MUTINY:CORE:CLIENT:SPAWN:OPEN_CHARACTER_SELECTOR",
      src,
      GATHERED_USER.characters
    );
  }
);
