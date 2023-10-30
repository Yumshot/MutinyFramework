import { __scenarios } from "config/enums/scenarios";
<<<<<<< HEAD
let tick = 0;

/**
 * Listens for the "checkScenarios" event and handles scenarios for the player character.
 */
onNet("checkScenarios", async () => {
  const scenarios = __scenarios;
=======
import { Delay } from "modules/utils/delay";

let tick = 0;
onNet("checkScenarios", async () => {
  const scenarios = __scenarios;
  console.log("DOES THIS WORK?");
>>>>>>> f5f09b9 (Add event to check and handle scenarios)
  setInterval(() => {
    tick++;
    emit("handleScenario", scenarios[tick]);
  }, 10000);
});

<<<<<<< HEAD
/**
 * Listens for the "handleScenario" event and handles the given scenario for the player character.
 * @param scenario - The scenario to handle for the player character.
 */
on("handleScenario", (scenario: string) => {
=======
on("handleScenario", (scenario: string) => {
  console.log("DOES THIS WORK? " + scenario);
>>>>>>> f5f09b9 (Add event to check and handle scenarios)
  const playerPed = PlayerPedId();
  if (scenario === "Standing") {
    ClearPedTasksImmediately(playerPed);
  } else {
    TaskStartScenarioInPlace(playerPed, scenario, 0, true);
  }
});

<<<<<<< HEAD
/**
 * Listens for the "clearScenario" event and clears the current scenario for the player character.
 */
=======
>>>>>>> f5f09b9 (Add event to check and handle scenarios)
onNet("clearScenario", () => {
  ClearPedTasksImmediately(PlayerPedId());
});
