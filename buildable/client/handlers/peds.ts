import { faker } from "@faker-js/faker";
import { Scenarios } from "enums/Scenarios";
import { Model, Vector3, World } from "fivem-js";
import { SetupJobPeds } from "utils/functions";

const MALE_WORKER = {
  first_name: faker.person.firstName("male"),
  last_name: faker.person.lastName("male"),
};

const FEMALE_WORKER = {
  first_name: faker.person.firstName("female"),
  last_name: faker.person.lastName("female"),
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
    const ped = await World.createPed(
      new Model(value.model),
      new Vector3(value.x, value.y, value.z - 1),
      value.heading
    );

    if (!ped) {
      return console.log(`Failed to create ped for job ${key}`);
    }

    const pedHandle = ped.Handle;
    SetupJobPeds(pedHandle);

    if (!IsPedActiveInScenario(pedHandle)) {
      TaskStartScenarioInPlace(pedHandle, Scenarios[11], 0, false);
    }
    JOB_NPCS.push({
      ped: pedHandle,
      title: value.title,
      bio: value.bio,
      job: key,
      canMove: value.canMove,
      availableWork: value.availableWork,
      jobLimit: value.jobLimit,
      coords: {
        x: value.x,
        y: value.y,
        z: value.z,
        heading: value.heading,
      },
      currentJobs: [],
    });
  }
};

try {
  CreatePedsAtJobLocations();
} catch (error) {
  console.log(error);
}
