import { DATABASE_COLLECTION_USERS } from "init";
import { RETURN_STEAM_ID } from "utils/steam";
export let SELECTED_CHARACTER: any;

onNet("MUTINY:CORE:SERVER:SELECTED_CHARACTER", async (reference: any) => {
    const src = source;
    SELECTED_CHARACTER = reference;    
    const query = RETURN_STEAM_ID(src);
    const user = await DATABASE_COLLECTION_USERS.findOne(query);
    console.log(' this is USER in selected.ts ', user);
    if (user) {
        emitNet("MUTINY:CORE:CLIENT:LOAD_CHARACTER", src, SELECTED_CHARACTER);    
    } else {
        return console.log('ERROR IN MUTINY:CORE:SERVER:SELECTED_CHARACTER');
    }
});