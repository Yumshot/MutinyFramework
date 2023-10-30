import { __scenarios } from "config/enums/scenarios";
<<<<<<< HEAD
<<<<<<< HEAD
let tick = 0;

/**
 * Listens for the "checkScenarios" event and handles scenarios for the player character.
 */
onNet("checkScenarios", async () => {
  const scenarios = __scenarios;
=======
import { Delay } from "modules/utils/delay";

=======
>>>>>>> 264a20d (Add Docs to all current files, to continue having a verbose documentation of this branch, this will most likely be merged shortly after i get a few systems squared away as they were previously.)
let tick = 0;

/**
 * Listens for the "checkScenarios" event and handles scenarios for the player character.
 */
onNet("checkScenarios", async () => {
  const scenarios = __scenarios;
<<<<<<< HEAD
  console.log("DOES THIS WORK?");
>>>>>>> f5f09b9 (Add event to check and handle scenarios)
=======
>>>>>>> 264a20d (Add Docs to all current files, to continue having a verbose documentation of this branch, this will most likely be merged shortly after i get a few systems squared away as they were previously.)
  setInterval(() => {
    tick++;
    emit("handleScenario", scenarios[tick]);
  }, 10000);
});

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 264a20d (Add Docs to all current files, to continue having a verbose documentation of this branch, this will most likely be merged shortly after i get a few systems squared away as they were previously.)
/**
 * Listens for the "handleScenario" event and handles the given scenario for the player character.
 * @param scenario - The scenario to handle for the player character.
 */
<<<<<<< HEAD
on("handleScenario", (scenario: string) => {
=======
on("handleScenario", (scenario: string) => {
  console.log("DOES THIS WORK? " + scenario);
>>>>>>> f5f09b9 (Add event to check and handle scenarios)
=======
on("handleScenario", (scenario: string) => {
>>>>>>> 264a20d (Add Docs to all current files, to continue having a verbose documentation of this branch, this will most likely be merged shortly after i get a few systems squared away as they were previously.)
  const playerPed = PlayerPedId();
  if (scenario === "Standing") {
    ClearPedTasksImmediately(playerPed);
  } else {
    TaskStartScenarioInPlace(playerPed, scenario, 0, true);
  }
});

<<<<<<< HEAD
<<<<<<< HEAD
/**
 * Listens for the "clearScenario" event and clears the current scenario for the player character.
 */
=======
>>>>>>> f5f09b9 (Add event to check and handle scenarios)
=======
/**
 * Listens for the "clearScenario" event and clears the current scenario for the player character.
 */
>>>>>>> 264a20d (Add Docs to all current files, to continue having a verbose documentation of this branch, this will most likely be merged shortly after i get a few systems squared away as they were previously.)
onNet("clearScenario", () => {
  ClearPedTasksImmediately(PlayerPedId());
});
