<<<<<<< HEAD
import { InitialSync } from "modules/utils/sync";

/**
 * Event handler for when a resource starts.
 * @param resource - The name of the resource that started.
 */
=======
>>>>>>> b5e75a5 (refactor(client): move old files to old folder)
on("onResourceStart", (resource: string) => {
  console.log(`\n ⌠Mutiny Rp⌡ - ${resource} has started!`);
  if (resource !== GetCurrentResourceName()) return;
  console.log(`\n ⌠Mutiny Rp⌡ - Setting up routing buckets!`);
<<<<<<< HEAD
  InitialSync();
  console.log(`\n ⌠Mutiny Rp⌡ - Routing buckets set!`);
=======
  SetRoutingBucketEntityLockdownMode(1, "strict");
  SetRoutingBucketPopulationEnabled(1, false);
>>>>>>> b5e75a5 (refactor(client): move old files to old folder)
});
