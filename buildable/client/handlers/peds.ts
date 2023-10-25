import { Delay, SetupJobPeds } from "utils/functions";
import { INpc } from "../../common/interfaces/Npc";
onNet("MUTINY:CORE:CLIENT:HANDLERS:PEDS:HANDOFF_PEDS", async (peds: INpc) => {
  console.log("YEP HERE");
  const npcs = GetGamePool("CPed");
  for (let i = 0; i < npcs.length; i++) {
    const pedOnClient = npcs[i];
    for (const [key, value] of Object.entries(peds)) {
      if (pedOnClient === value.ped) {
        console.log("PEDS ARE THE SAME");
        const pedHandle = NetworkGetEntityFromNetworkId(value.ped);
        SetupJobPeds(pedHandle);
      }
    }
  }

  // for (const [key, value] of Object.entries(peds)) {
  //   NPCS.push({
  //     ped: value.ped,
  //     title: value.title,
  //     bio: value.bio,
  //     job: key,
  //     canMove: value.canMove,
  //     availableWork: value.availableWork,
  //     jobLimit: value.jobLimit,
  //     scenario: value.scenario,
  //     icon: value.icon,
  //     distance: value.distance,
  //     coords: {
  //       x: value.x,
  //       y: value.y,
  //       z: value.z,
  //       heading: value.heading,
  //     },
  //     currentJobs: [],
  //   });
  // }
  // for (const [key, value] of Object.entries(NPCS)) {
  //   const pedHandle = NetworkGetEntityFromNetworkId(value.ped);
  //   SetupJobPeds(pedHandle);
  // }
});
