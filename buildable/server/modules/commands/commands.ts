import { CreateWorldVehicle } from "./events/requestVehicle";
import { getUserHex } from "./functions/getUserHex";

/**
 * Object containing various commands for the command system.
 */

/**
 * Defines a collection of commands for the Mutiny Framework server.
 */

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
    event: (source: any) => emitNet("spawnVehicle", source[0], source[1]),

    async: true,
    restricted: true,
    description: "Spawns a vehicle",
    usage: "/car [model]",
  },
  /**
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
  /**
   * Spawns a random scenario for the player.
   * @param source - The player to spawn the scenario for.
   */
  scenario: {
    event: (source: any) => emitNet("checkScenarios", source[0]),
    async: true,
    restricted: true,
    description: "Spawns a random scenario",
    usage: "/scenario",
  },
  /**
   * Clears the scenario for the player.
   * @param source - The player to clear the scenario for.
   */
  clearScenario: {
    event: (source: any) => emitNet("clearScenario", source[0]),
    async: true,
    restricted: true,
    description: "Clears the scenario",
    usage: "/clearScenario",
  },
  /**
   * Gets the routing bucket of a player.
   * @param source - The player to get the routing bucket of.
   */
  getRoutingBucket: {
    event: (source: any) => {
      console.log(GetPlayerRoutingBucket(source[0]));
    },
    async: true,
    restricted: true,
    description: "Gets the routing bucket of a player",
    usage: "/getRoutingBucket [player]",
  },
  /**
   * Sets the routing bucket of a player.
   * @param source - The player to set the routing bucket for.
   * @param bucket - The routing bucket to set.
   */
  setRoutingBucket: {
    event: (source: any) => {
      SetPlayerRoutingBucket(source[0].toString(), source[1]);
    },
    async: true,
    restricted: true,
    description: "Sets the routing bucket of a player",
    usage: "/setRoutingBucket [player] [bucket]",
  },
  respawn: {
    event: (source: any) => {
      emitNet("respawnPlayer", source[0]);
    },
    async: true,
    restricted: true,
    description: "Respawns the player",
    usage: "/respawn",
  },
};
