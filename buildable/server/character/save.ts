import { DATABASE_COLLECTION_USERS } from "init";
import { RETURN_STEAM_ID } from "utils/steam"

onNet("MUTINY:CORE:SERVER:SAVE_CHARACTER_OUTFIT", async (character_index: number, data: any) => {
  const src = source;
  const query = RETURN_STEAM_ID(src);
    const characterIndex = "characters." + character_index + ".model";
    const update = {
      $set: { [characterIndex]: data },
    };

    const result = await DATABASE_COLLECTION_USERS.updateOne(query, update);

    if (result.matchedCount === 0) {
        console.log("ERROR SAVING")
    } else {
      console.log("A document matched the provided query.");
      // if (character_index === 0) {
      // }
      const user = await DATABASE_COLLECTION_USERS.findOne(query, { limit: 1 });
      emitNet(
        "MUTINY:CORE:CLIENT:HANDLE_TELEPORT",
        src,
        user.characters[character_index].last_location
      );
    }
    
})