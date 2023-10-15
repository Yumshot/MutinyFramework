import { DATABASE_COLLECTION_USERS } from "init";
import { IPriority } from "join/functions/priority";

// 1. Create an interface representing a document in MongoDB.
export interface INewCharacter {
  first_name: string;
  last_name: string;
  birthday: string;
  sex: string;
  last_location: { x: number, y: number, z: number, h: number},
  model: object,
  job: object[]
}

onNet(
  "MUTINY:CORE:SERVER:CREATE_FIRST_CHARACTER",
  async (data: [INewCharacter, IPriority]) => {
    const source = global.source;
    const query = { steam: data[1].steam };
    const last_location = { x: 4446.048, y: -4506.95, z: 3.574, heading: 160.0 };
    const job_base = {
      title: "UNEMPLOYED",
      active: true,
      pay: 0,
      tax_rate: 0,
    }
    const constructed = {...data[0], last_location: last_location, job: job_base}
    const update = {
      $push: { characters: constructed },
      $set: {
        first_join: false,
      },
    };

    const result = await DATABASE_COLLECTION_USERS.updateOne(query, update);

    if (result.matchedCount === 0) {
      DropPlayer(source.toString(), "Database Error, Retry");
    } else {
      console.log("A document matched the provided query.");
      emitNet("MUTINY:CORE:CLIENT:REGISTERED_CHARACTER", source, data);
    }
  }
);
