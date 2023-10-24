import { faker } from "@faker-js/faker";
import { Scenarios } from "enums/Scenarios";
import { Model, Vector3, World } from "fivem-js";
import { SetupJobPeds } from "utils/functions";
import { LOCALES } from "../../common/globals";

const MALE_WORKER = {
  first_name: faker.person.firstName("male"),
  last_name: faker.person.lastName("male"),
};

const FEMALE_WORKER = {
  first_name: faker.person.firstName("female"),
  last_name: faker.person.lastName("female"),
};

export const NPC_LOCATIONS = {
  dock_worker: {
    model: "s_m_m_dockwork_01",
    title: "Dock Worker",
    icon: LOCALES.NOTIFICATIONS.DOCK_WORKER_ICON,
    bio: { first: MALE_WORKER.first_name, last: MALE_WORKER.last_name },
    x: -412.82989501953125,
    y: -2284.13671875,
    z: 8.01533031463623,
    heading: 75.70753479003906,
    canMove: false,
    availableWork: true,
    jobLimit: 5,
    scenario: Scenarios[11],
    distance: 1.0,
  },
  cayo_bartender: {
    model: "s_m_y_barman_01",
    title: "Bartender",
    bio: { first: "Bartender", last: "Bartender" },
    icon: LOCALES.NOTIFICATIONS.BARTENDER_ICON,
    x: 4904.32080078125,
    y: -4942.1142578125,
    z: 3.3648681640625,
    heading: 31.181102752685547,
    canMove: false,
    availableWork: false,
    jobLimit: null as number | null,
    scenario: Scenarios[77],
    distance: 5.0,
  },
  drug_dealer: {
    model: "csb_grove_str_dlr",
    title: "Drug Dealer",
    icon: LOCALES.NOTIFICATIONS.DRUG_DEALER_ICON,
    bio: { first: "Tony", last: "Toughnutz" },
    x: 905.4857177734375,
    y: -1687.859375,
    z: 47.3428955078125,
    heading: 107.71653747558594,
    canMove: false,
    availableWork: true,
    jobLimit: null as number | null,
    scenario: Scenarios[18],
    distance: 1.0,
  },
};

interface INpc {
  ped: number;
  title: string;
  job: string;
  bio: { first: string; last: string };
  coords: { x: number; y: number; z: number; heading: number };
  canMove: boolean;
  availableWork: boolean;
  jobLimit: number | null;
  currentJobs: any[];
  scenario: string | number | null;
  icon: string;
  distance: number;
}

export let NPCS: INpc[] = [];

export const CreatePedsAtLocations = async () => {
  // create a loop that loops over JOB_LOCATIONS, and creates a ped at each location with the handle of the ped being the key of the object
  for (const [key, value] of Object.entries(NPC_LOCATIONS)) {
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

    if (!IsPedActiveInScenario(pedHandle) && value.scenario !== null) {
      TaskStartScenarioInPlace(pedHandle, value.scenario, 0, false);
    }

    NPCS.push({
      ped: pedHandle,
      title: value.title,
      bio: value.bio,
      job: key,
      canMove: value.canMove,
      availableWork: value.availableWork,
      jobLimit: value.jobLimit,
      scenario: value.scenario,
      icon: value.icon,
      distance: value.distance,
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
  CreatePedsAtLocations();
} catch (error) {
  console.log(error);
}
