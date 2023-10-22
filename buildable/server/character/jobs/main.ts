import { GATHER_USER_DATA_FOR_SERVER } from "database/functions";
import { DATABASE_COLLECTION_USERS } from "database/init";
import { INotification } from "../../../common/interfaces/Notification";
import { LOCALES } from "../../../common/globals";

onNet("MUTINY:CORE:SERVER:CHARACTER:JOBS:ELIGIBLE_CHECK", async (data: any) => {
  const source = global.source;
  const GATHERED_USER = await GATHER_USER_DATA_FOR_SERVER(source);
  // console.log(data.npc.job);
  const JOBS = [...GATHERED_USER.characters[GATHERED_USER.last_character].job];

  const target = data.npc.job;
  const result = JOBS.find((job) => job.title === target);
  result.active = true;
  // loop through the other actives and set them to false
  for (const job of JOBS) {
    if (job.title !== target) {
      job.active = false;
    }
  }
  // reset the job array to the new array
  GATHERED_USER.characters[GATHERED_USER.last_character].job = JOBS;
  // update the database
  const query = { steam: GATHERED_USER.steam };
  const update = {
    $set: { characters: GATHERED_USER.characters },
  };
  try {
    await DATABASE_COLLECTION_USERS.updateOne(query, update);
    emitNet(
      "MUTINY:CORE:CLIENT:CHARACTER:JOBS:ELIGIBLE_CHECK:RESPONSE",
      source,
      { data, result }
    );
  } catch (error) {
    console.error(error);
  }
});

RegisterCommand(
  "qjob",
  async (source: number, args: string[], raw: any) => {
    const GATHERED_USER = await GATHER_USER_DATA_FOR_SERVER(source);
    const JOBS = [
      ...GATHERED_USER.characters[GATHERED_USER.last_character].job,
    ];
    const target = JOBS[0];
    target.active = true;
    // loop through the other actives and set them to false
    for (const job of JOBS) {
      if (job.title !== target.title) {
        job.active = false;
      }
    }
    // reset the job array to the new array
    GATHERED_USER.characters[GATHERED_USER.last_character].job = JOBS;
    // update the database
    const query = { steam: GATHERED_USER.steam };
    const update = {
      $set: { characters: GATHERED_USER.characters },
    };
    try {
      const result2 = await DATABASE_COLLECTION_USERS.updateOne(query, update);
      const notification: INotification = {
        title: "Human Resources",
        text: "Alright, you are now Unemployed.",
        position: "top-right",
        color: "success",
        sticky: true,
        width: "auto",
        progress: "auto",
        icon: LOCALES.NOTIFICATIONS.HR_ICON,
      };
      if (result2.modifiedCount === 1) {
        emitNet("MUTINY:CORE:CLIENT:NOTIFY_FROM_SERVER", source, notification);
      }
    } catch (error) {
      console.error(error);
    }
  },
  false
);
