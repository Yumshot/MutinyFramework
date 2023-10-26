/**
 * Creates a new character for a player and updates the database with the new character.
 * @param data - An array containing the new character object and the player's priority data.
 */
import { DATABASE_COLLECTION_USERS } from "old/database/init";
import { BankAccount } from "old/Bank";
import {
  DataParameterCreateUserCredentials,
  NewCharacter,
} from "old/Character";
import { Job } from "old/Job";
import { DEFAULT_JOBS } from "sv_globals";
import { Logger } from "modules/utils/logger";
import { v4 as uuidv4 } from "uuid";

// Define the function to create a new character
onNet(
  "MUTINY:CORE:SERVER:CHARACTER:CREATE:CREATE_FIRST_CHARACTER",
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
    const defaultJobs: Job[] = DEFAULT_JOBS;
    const defaultFunds = {
      cash: { amount: 0 },
      bank: [
        {
          id: 1,
          name: "Checking",
          acc_number: "0000000000",
          balance: 0,
          transactions: [] as object[],
          loans: [] as { [key: string]: any }[],
        },
        {
          id: 2,
          name: "Savings",
          acc_number: "0000000000",
          balance: 0,
          transactions: [],
          loans: [],
        },
      ] as BankAccount[],
    };
    const defaultIndex = 0;

    // Construct the new character object with default values
    const newCharacter: NewCharacter = {
      index: data[0].index + 1 || defaultIndex,
      ...data[0],
      last_location: data[0].last_location || defaultLocation,
      job: data[0].job && data[0].job.length > 0 ? data[0].job : defaultJobs,
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
      const Log = new Logger();
      Log.info("A document matched the provided query.", {
        source,
        resource: GetCurrentResourceName().toUpperCase(),
        function: "MUTINY:CORE:SERVER:CHARACTER:CREATE:CREATE_FIRST_CHARACTER",
      });
      emitNet(
        "MUTINY:CORE:CLIENT:HANDLERS:CALLBACKS:REGISTERED_CHARACTER",
        source,
        data
      );
    }
  }
);
