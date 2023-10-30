import { getUserHex } from "./functions/getUserHex";

/**
 * Object containing various commands for the command system.
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
  scenario: {
    event: (source: any) => emitNet("checkScenarios", source[0]),
    async: true,
    restricted: true,
    description: "Spawns a random scenario",
    usage: "/scenario",
  },
  clearScenario: {
    event: (source: any) => emitNet("clearScenario", source[0]),
    async: true,
    restricted: true,
    description: "Clears the scenario",
    usage: "/clearScenario",
  },
  getRoutingBucket: {
    event: (source: any) => {
      console.log(GetPlayerRoutingBucket(source[0]));
    },
    async: true,
    restricted: true,
    description: "Gets the routing bucket of a player",
    usage: "/getRoutingBucket [player]",
  },
  setRoutingBucket: {
    event: (source: any) => {
      SetPlayerRoutingBucket(source[0].toString(), source[1]);
    },
    async: true,
    restricted: true,
    description: "Sets the routing bucket of a player",
    usage: "/setRoutingBucket [player] [bucket]",
  },
};
