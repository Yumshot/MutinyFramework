import { GATHER_USER_DATA_FOR_SERVER } from "old/database/functions";

on("playerJoining", async (source: any, _oldID: any) => {
    const src = source;
    const GATHERED_USER = await GATHER_USER_DATA_FOR_SERVER(src);
    emitNet("MUTINY:CORE:CLIENT:SPAWN:SET_DATA", src, GATHERED_USER);
});

