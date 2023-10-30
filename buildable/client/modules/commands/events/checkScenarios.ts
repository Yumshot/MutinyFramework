import { __scenarios } from "config/enums/scenarios";
import { Delay } from "modules/utils/delay";

let tick = 0;
onNet("checkScenarios", async () => {
  const scenarios = __scenarios;
  console.log("DOES THIS WORK?");
  setInterval(() => {
    tick++;
    emit("handleScenario", scenarios[tick]);
  }, 10000);
});

on("handleScenario", (scenario: string) => {
  console.log("DOES THIS WORK? " + scenario);
  const playerPed = PlayerPedId();
  if (scenario === "Standing") {
    ClearPedTasksImmediately(playerPed);
  } else {
    TaskStartScenarioInPlace(playerPed, scenario, 0, true);
  }
});

onNet("clearScenario", () => {
  ClearPedTasksImmediately(PlayerPedId());
});
