import { __scenarios } from "config/enums/scenarios";
let tick = 0;

/**
 * Listens for the "checkScenarios" event and handles scenarios for the player character.
 */
onNet("checkScenarios", async () => {
  const scenarios = __scenarios;
  setInterval(() => {
    tick++;
    emit("handleScenario", scenarios[tick]);
  }, 10000);
});

/**
 * Listens for the "handleScenario" event and handles the given scenario for the player character.
 * @param scenario - The scenario to handle for the player character.
 */
on("handleScenario", (scenario: string) => {
  const playerPed = PlayerPedId();
  if (scenario === "Standing") {
    ClearPedTasksImmediately(playerPed);
  } else {
    TaskStartScenarioInPlace(playerPed, scenario, 0, true);
  }
});

/**
 * Listens for the "clearScenario" event and clears the current scenario for the player character.
 */
onNet("clearScenario", () => {
  ClearPedTasksImmediately(PlayerPedId());
});
