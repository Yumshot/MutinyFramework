<<<<<<< HEAD
<<<<<<< HEAD
import { CreateWorldVehicle } from "./events/requestVehicle";
=======
>>>>>>> a59d569 (feat: Add commandHandler module)
=======
import { CreateWorldVehicle } from "./events/requestVehicle";
>>>>>>> 92c4a06 (feat: Add job peds configuration file)
import { getUserHex } from "./functions/getUserHex";

/**
 * Object containing various commands for the command system.
 */
<<<<<<< HEAD
<<<<<<< HEAD
/**
 * Defines a collection of commands for the Mutiny Framework server.
 */
=======
>>>>>>> a59d569 (feat: Add commandHandler module)
=======
/**
 * Defines a collection of commands for the Mutiny Framework server.
 */
>>>>>>> 92c4a06 (feat: Add job peds configuration file)
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
<<<<<<< HEAD
    event: (source: any) => CreateWorldVehicle(source[0], source[1]),
=======
    event: (source: any) => emitNet("spawnVehicle", source[0], source[1]),
>>>>>>> a59d569 (feat: Add commandHandler module)
=======
    event: (source: any) => CreateWorldVehicle(source[0], source[1]),
>>>>>>> 92c4a06 (feat: Add job peds configuration file)
    async: true,
    restricted: true,
    description: "Spawns a vehicle",
    usage: "/car [model]",
  },
  /**
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 92c4a06 (feat: Add job peds configuration file)
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
<<<<<<< HEAD
=======
>>>>>>> a59d569 (feat: Add commandHandler module)
=======
>>>>>>> 92c4a06 (feat: Add job peds configuration file)
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
<<<<<<< HEAD
=======
>>>>>>> 92c4a06 (feat: Add job peds configuration file)
  /**
   * Spawns a random scenario for the player.
   * @param source - The player to spawn the scenario for.
   */
<<<<<<< HEAD
=======
>>>>>>> a59d569 (feat: Add commandHandler module)
=======
>>>>>>> 92c4a06 (feat: Add job peds configuration file)
  scenario: {
    event: (source: any) => emitNet("checkScenarios", source[0]),
    async: true,
    restricted: true,
    description: "Spawns a random scenario",
    usage: "/scenario",
  },
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 92c4a06 (feat: Add job peds configuration file)
  /**
   * Clears the scenario for the player.
   * @param source - The player to clear the scenario for.
   */
<<<<<<< HEAD
=======
>>>>>>> a59d569 (feat: Add commandHandler module)
=======
>>>>>>> 92c4a06 (feat: Add job peds configuration file)
  clearScenario: {
    event: (source: any) => emitNet("clearScenario", source[0]),
    async: true,
    restricted: true,
    description: "Clears the scenario",
    usage: "/clearScenario",
  },
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 92c4a06 (feat: Add job peds configuration file)
  /**
   * Gets the routing bucket of a player.
   * @param source - The player to get the routing bucket of.
   */
<<<<<<< HEAD
=======
>>>>>>> a59d569 (feat: Add commandHandler module)
=======
>>>>>>> 92c4a06 (feat: Add job peds configuration file)
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
<<<<<<< HEAD
=======
>>>>>>> 92c4a06 (feat: Add job peds configuration file)
  /**
   * Sets the routing bucket of a player.
   * @param source - The player to set the routing bucket for.
   * @param bucket - The routing bucket to set.
   */
<<<<<<< HEAD
=======
>>>>>>> a59d569 (feat: Add commandHandler module)
=======
>>>>>>> 92c4a06 (feat: Add job peds configuration file)
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
<<<<<<< HEAD
=======
>>>>>>> 92c4a06 (feat: Add job peds configuration file)
  respawn: {
    event: (source: any) => {
      emitNet("respawnPlayer", source[0]);
    },
    async: true,
    restricted: true,
    description: "Respawns the player",
    usage: "/respawn",
  },
<<<<<<< HEAD
=======
>>>>>>> a59d569 (feat: Add commandHandler module)
=======
>>>>>>> 92c4a06 (feat: Add job peds configuration file)
};
