import { DATABASE_COLLECTION_USERS } from "init";
import { RETURN_STEAM_ID } from "utils/steam";

on("playerJoining", async (source: any, oldID: any) => {
    const DEFAULT_SPAWN = { x: 7614.787, y: 1064.8, z: 1678.407 };
    const query = RETURN_STEAM_ID(source);
    const GATHERED_USER = await DATABASE_COLLECTION_USERS.findOne(query);
    emitNet("MUTINY:CORE:CLIENT:SPAWN_HANDLER", source, GATHERED_USER, DEFAULT_SPAWN);
});

onNet("MUTINY:CORE:SERVER:SPAWN_IMPORT", async (identifiers: any) => {
 const src = source;
 const query = RETURN_STEAM_ID(src);
 const GATHERED_USER = await DATABASE_COLLECTION_USERS.findOne(query);
    emitNet(
      "MUTINY:CORE:CLIENT:OPEN_CHARACTER_SELECTOR",
      src,
      GATHERED_USER.characters
    );    
});