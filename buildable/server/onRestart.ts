import { faker } from "@faker-js/faker";
import { Scenarios } from "../common/enums/Scenarios";
import { LOCALES } from "../common/globals";
import { INpc } from "../common/interfaces/Npc";
export let NPCS: INpc[] = [];

const MALE_WORKER = {
  first_name: faker.person.firstName("male"),
  last_name: faker.person.lastName("male"),
};

export const NPC_LOCATIONS = {
  dock_worker: {
    ped: null as number | null,
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
    ped: null as number | null,
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
    ped: null as number | null,
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
on("onResourceStart", async (resource: string) => {
  SetRoutingBucketEntityLockdownMode(1, "strict");
  console.log(`MUTINY>CORE>SERVER>ONRESTART>STARTED:  ${resource}`);
  if (resource === GetCurrentResourceName()) {
    for (const [key, value] of Object.entries(NPC_LOCATIONS)) {
      const ped = CreatePed(
        2,
        value.model,
        value.x,
        value.y,
        value.z,
        value.heading,
        true,
        true
      );
      SetEntityRoutingBucket(ped, 1);

      NPCS.push({
        ped: ped,
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
  }
});

onNet("MUTINY:CORE:SERVER:HANDLERS:SET_PED_OPTS", () => {
  emitNet("MUTINY:CORE:CLIENT:HANDLERS:PEDS:HANDOFF_PEDS", source, NPCS);
});
