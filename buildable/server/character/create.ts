/**
 * Creates a new character for a player and updates the database with the new character.
 * @param data - An array containing the new character object and the player's priority data.
 */
import { DATABASE_COLLECTION_USERS } from "init";
import { DataParameterCreateUserCredentials, NewCharacter } from "utils/interfaces/Character";
import { Job } from "utils/interfaces/Job";
import { Priority } from "utils/interfaces/Priority";

// Define the function to create a new character
onNet(
  "MUTINY:CORE:SERVER:CREATE_FIRST_CHARACTER",
  async (data: DataParameterCreateUserCredentials) => {
    const source = global.source;

    // Check if the data parameter is missing required properties
    if (!data[0] || !data[1] || !data[1].steam) {
      console.error("Invalid input data");
      return;
    }

    const query = { steam: data[1].steam };

    // Define the default values for a new character
    const defaultLocation = {
      x: 4446.048,
      y: -4506.95,
      z: 3.574,
      heading: 160.0,
    };
    const defaultJob: Job = {
      title: "UNEMPLOYED",
      active: true,
      pay: 0,
      tax_rate: 0,
    };
    const defaultFunds = {
      cash: { amount: 0 },
      bank: [
        {
          id: 1,
          name: "Checking",
          balance: 0,
          transactions: [] as object[],
          loans: [] as { [key: string]: any }[],
        },
        {
          id: 2,
          name: "Savings",
          balance: 0,
          transactions: [],
          loans: [],
        },
      ],
    };

    // Construct the new character object with default values
    const newCharacter: NewCharacter = {
      ...data[0],
      last_location: data[0].last_location || defaultLocation,
      job: data[0].job && data[0].job.length > 0 ? data[0].job : [defaultJob],
      funds: data[0].funds || defaultFunds,
    };

    // Define the update object for the database query
    const update = {
      $push: { characters: newCharacter },
      $set: { first_join: false },
    };

    // Update the database with the new character
    const result = await DATABASE_COLLECTION_USERS.updateOne(query, update);

    if (result.matchedCount === 0) {
      // If the database update failed, drop the player
      DropPlayer(source.toString(), "Database Error, Retry");
    } else {
      // If the database update succeeded, emit an event to the client
      console.log("A document matched the provided query.");
      emitNet("MUTINY:CORE:CLIENT:REGISTERED_CHARACTER", source, data);
    }
  }
);
