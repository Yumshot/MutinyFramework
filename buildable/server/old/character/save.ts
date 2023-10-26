import { DATABASE_COLLECTION_USERS } from "old/database/init";
import { findSteam } from "modules/utils/functions";

onNet(
  "MUTINY:CORE:SERVER:CHARACTER:SAVE:SAVE_CHARACTER_OUTFIT",
  async (character_index: number, data: any) => {
    const src = source;
    const query = findSteam(src);
    const characterIndex = "characters." + character_index + ".model";
    const update = {
      $set: { [characterIndex]: data },
    };

    const result = await DATABASE_COLLECTION_USERS.updateOne(query, update);

    if (result.matchedCount === 0) {
      console.log("ERROR SAVING");
    } else {
      console.log("A document matched the provided query.");
      // if (character_index === 0) {
      // }
      const user = await DATABASE_COLLECTION_USERS.findOne(query, { limit: 1 });
      emitNet(
        "MUTINY:CORE:CLIENT:HANDLERS:TELEPORT",
        src,
        user.characters[character_index].last_location
      );
    }
  }
);

on("playerDropped", async (reason: any) => {
  console.log(
    `Player ${GetPlayerName(
      global.source.toString()
    )} dropped (Reason: ${reason}).`
  );
  // Update information in database
  const coords = GetEntityCoords(GetPlayerPed(global.source.toString()));
  console.log(coords);
  const query = findSteam(global.source.toString());
  const update = {
    $set: {
      "characters.0.last_location": {
        x: coords[0],
        y: coords[1],
        z: coords[2],
        heading: GetEntityHeading(GetPlayerPed(global.source.toString())),
      },
    },
  };

  const result = await DATABASE_COLLECTION_USERS.updateOne(query, update);

  if (result.matchedCount === 0) {
    console.log("ERROR SAVING");
  } else {
    console.log("A document matched the provided query.");
  }
});
