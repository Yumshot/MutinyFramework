import { RETURN_STEAM_ID } from "utils/steam";
export let SELECTED_CHARACTER: any;

onNet("MUTINY:CORE:SERVER:SELECTED_CHARACTER", (reference: any) => {
    SELECTED_CHARACTER = reference;    
    emitNet("MUTINY:CORE:CLIENT:LOAD_CHARACTER", source, SELECTED_CHARACTER);    
});