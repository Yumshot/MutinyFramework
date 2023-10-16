import { GATHER_USER_DATA_FOR_SERVER } from "database/functions";

on("playerJoining", async (source: any, oldID: any) => {
    const src = source;
    const GATHERED_USER = await GATHER_USER_DATA_FOR_SERVER(src);
    console.log("MUTINY>SERVER>JOIN>FUNCTIONS>CHARACTERS playerJoining (GATHERED_USER) ", GATHERED_USER);
    emitNet("MUTINY:CORE:CLIENT:SPAWN:SET_DATA", src, GATHERED_USER);
});

