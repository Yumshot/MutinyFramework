<<<<<<< HEAD
import { CreateWorldVehicle } from "./events/requestVehicle";
=======
>>>>>>> a59d569 (feat: Add commandHandler module)
import { getUserHex } from "./functions/getUserHex";

/**
 * Object containing various commands for the command system.
 */
<<<<<<< HEAD
/**
 * Defines a collection of commands for the Mutiny Framework server.
 */
=======
>>>>>>> a59d569 (feat: Add commandHandler module)
export const __commandSystem = {
  /**
   * Teleports the player to the marker on the map.
   * @param source - The player to teleport.
   */
  tpm: {
    event: (source: any) => emitNet("teleportToMarker", source[0]),
    async: false,
    restricted: true,
    description: "Teleports you to the marker on map",
    usage: "/tpm",
  },
  /**
   * Spawns a vehicle for the player.
   * @param source - The player to spawn the vehicle for.
   * @param model - The model of the vehicle to spawn.
   */
  car: {
<<<<<<< HEAD
    event: (source: any) => CreateWorldVehicle(source[0], source[1]),
=======
    event: (source: any) => emitNet("spawnVehicle", source[0], source[1]),
>>>>>>> a59d569 (feat: Add commandHandler module)
    async: true,
    restricted: true,
    description: "Spawns a vehicle",
    usage: "/car [model]",
  },
  /**
<<<<<<< HEAD
   * Removes vehicle for the player.
   * @param source - The player to spawn the vehicle for.
   */
  dv: {
    event: (source: any) => emitNet("deleteVehicle", source[0]),
    async: true,
    restricted: true,
    description: "Deletes the vehicle you are in",
    usage: "/dv",
  },
  /**
=======
>>>>>>> a59d569 (feat: Add commandHandler module)
   * Gets the hex of a player.
   * @param source - The player to get the hex of.
   */
  hex: {
    event: async (source: any) => {
      if (source[1]) {
        console.log(await getUserHex(source[1]));
      } else {
        console.log(await getUserHex(source[0]));
      }
    },
    async: true,
    restricted: true,
    description: "Gets the hex of a player",
    usage: "/hex [player] or /hex for self",
  },
<<<<<<< HEAD
  /**
   * Spawns a random scenario for the player.
   * @param source - The player to spawn the scenario for.
   */
=======
>>>>>>> a59d569 (feat: Add commandHandler module)
  scenario: {
    event: (source: any) => emitNet("checkScenarios", source[0]),
    async: true,
    restricted: true,
    description: "Spawns a random scenario",
    usage: "/scenario",
  },
<<<<<<< HEAD
  /**
   * Clears the scenario for the player.
   * @param source - The player to clear the scenario for.
   */
=======
>>>>>>> a59d569 (feat: Add commandHandler module)
  clearScenario: {
    event: (source: any) => emitNet("clearScenario", source[0]),
    async: true,
    restricted: true,
    description: "Clears the scenario",
    usage: "/clearScenario",
  },
<<<<<<< HEAD
  /**
   * Gets the routing bucket of a player.
   * @param source - The player to get the routing bucket of.
   */
=======
>>>>>>> a59d569 (feat: Add commandHandler module)
  getRoutingBucket: {
    event: (source: any) => {
      console.log(GetPlayerRoutingBucket(source[0]));
    },
    async: true,
    restricted: true,
    description: "Gets the routing bucket of a player",
    usage: "/getRoutingBucket [player]",
  },
<<<<<<< HEAD
  /**
   * Sets the routing bucket of a player.
   * @param source - The player to set the routing bucket for.
   * @param bucket - The routing bucket to set.
   */
=======
>>>>>>> a59d569 (feat: Add commandHandler module)
  setRoutingBucket: {
    event: (source: any) => {
      SetPlayerRoutingBucket(source[0].toString(), source[1]);
    },
    async: true,
    restricted: true,
    description: "Sets the routing bucket of a player",
    usage: "/setRoutingBucket [player] [bucket]",
  },
<<<<<<< HEAD
  respawn: {
    event: (source: any) => {
      emitNet("respawnPlayer", source[0]);
    },
    async: true,
    restricted: true,
    description: "Respawns the player",
    usage: "/respawn",
  },
=======
>>>>>>> a59d569 (feat: Add commandHandler module)
};
