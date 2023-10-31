import { InitialSync } from "modules/utils/sync";

/**
 * Event handler for when a resource starts.
 * @param resource - The name of the resource that started.
 */
on("onResourceStart", (resource: string) => {
  console.log(`\n ⌠Mutiny Rp⌡ - ${resource} has started!`);
  if (resource !== GetCurrentResourceName()) return;
  console.log(`\n ⌠Mutiny Rp⌡ - Setting up routing buckets!`);
  InitialSync();
  console.log(`\n ⌠Mutiny Rp⌡ - Routing buckets set!`);
});
