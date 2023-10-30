<<<<<<< HEAD
<<<<<<< HEAD
import { InitialSync } from "modules/utils/sync";

=======
>>>>>>> 264a20d (Add Docs to all current files, to continue having a verbose documentation of this branch, this will most likely be merged shortly after i get a few systems squared away as they were previously.)
/**
 * Event handler for when a resource starts.
 * @param resource - The name of the resource that started.
 */
<<<<<<< HEAD
=======
>>>>>>> b5e75a5 (refactor(client): move old files to old folder)
=======
>>>>>>> 264a20d (Add Docs to all current files, to continue having a verbose documentation of this branch, this will most likely be merged shortly after i get a few systems squared away as they were previously.)
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
