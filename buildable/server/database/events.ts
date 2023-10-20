import { DATABASE_COLLECTION_USERS } from "database/init";
import { findSteam } from "utils/functions";

onNet("MUTINY:CORE:SERVER:DATABASE:EVENTS:GATHER_USER_DATA_FOR_CLIENT", async (caller: string) => {
    const src = source;
    const query = findSteam(src);
    const GATHERED_USER = await DATABASE_COLLECTION_USERS.findOne(query);
    console.log(src, query, caller, "emitNet(`${caller}`, src, GATHERED_USER)");
    emitNet(caller, src, GATHERED_USER);
});

// onNet("MUTINY:CORE:SERVER:DATABASE:EVENTS:GATHER_USER_CHARACTER_FOR_CLIENT", async (caller: string) => {
    
// });