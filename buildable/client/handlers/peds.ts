import { faker } from "@faker-js/faker";
import { Scenarios } from "enums/Scenarios";
import { MakeModelRequest } from "utils/functions";

const MALE_WORKER = {
  first_name: faker.person.firstName("male"),
  last_name: faker.person.lastName("male"),
};
export const JOB_LOCATIONS = {
  dock_worker: {
    model: "s_m_m_dockwork_01",
    title: "Dock Worker",
    bio: { first: MALE_WORKER.first_name, last: MALE_WORKER.last_name },
    x: -412.82989501953125,
    y: -2284.13671875,
    z: 8.01533031463623,
    heading: 75.70753479003906,
    canMove: false,
    availableWork: true,
    jobLimit: 5,
  },
};

interface IJobNpc {
  ped: number;
  title: string;
  job: string;
  bio: { first: string; last: string };
  coords: { x: number; y: number; z: number; heading: number };
  canMove: boolean;
  availableWork: boolean;
  jobLimit: number;
  currentJobs: any[];
}

export let JOB_NPCS: IJobNpc[] = [];

export const CreatePedsAtJobLocations = async () => {
  // create a loop that loops over JOB_LOCATIONS, and creates a ped at each location with the handle of the ped being the key of the object
  for (const [key, value] of Object.entries(JOB_LOCATIONS)) {
    await MakeModelRequest({ model: value.model }, 500);
    const ped = CreatePed(
      4,
      value.model,
      value.x,
      value.y,
      value.z - 1,
      value.heading,
      false,
      true
    );
    if (!DoesEntityExist(ped)) {
      console.log("ped does not exist");
      continue;
    }
    SetEntityAsMissionEntity(ped, true, true);
    SetBlockingOfNonTemporaryEvents(ped, true);
    SetPedFleeAttributes(ped, 0, false);
    SetPedCombatAttributes(ped, 17, true);
    SetPedCombatAttributes(ped, 5, true);
    SetPedCombatAttributes(ped, 46, true);
    SetPedCombatAttributes(ped, 26, true);
    SetPedCombatAttributes(ped, 0, true);
    SetPedCombatAttributes(ped, 2, true);

    SetPedRelationshipGroupHash(ped, GetHashKey("CIVMALE"));
    SetRelationshipBetweenGroups(
      0,
      GetHashKey("CIVMALE"),
      GetHashKey("PLAYER")
    );
    SetRelationshipBetweenGroups(
      0,
      GetHashKey("PLAYER"),
      GetHashKey("CIVMALE")
    );

    FreezeEntityPosition(ped, true);

    SetPedDiesWhenInjured(ped, false);

    SetPedConfigFlag(ped, 118, true);

    SetPedConfigFlag(ped, 184, true);

    SetPedConfigFlag(ped, 429, true);

    SetPedConfigFlag(ped, 281, true);

    SetEntityInvincible(ped, true);

    if (!IsPedActiveInScenario(ped)) {
      TaskStartScenarioInPlace(ped, Scenarios[11], 0, false);
    }
    JOB_NPCS.push({
      ped,
      title: value.title,
      bio: value.bio,
      job: key,
      canMove: value.canMove,
      availableWork: value.availableWork,
      jobLimit: value.jobLimit,
      coords: { x: value.x, y: value.y, z: value.z, heading: value.heading },
      currentJobs: [],
    });
  }
};

interface IJobUser {
  ped: number;
  steam: string;
  rank: number;
  currentJob: string;
}

CreatePedsAtJobLocations()
  .then(() => {
    console.log("done");
  })
  .catch((err) => {
    console.log(err);
  });
