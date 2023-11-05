import { addNewDoor } from "./events/addDoor";
import { CreateWorldVehicle } from "./events/requestVehicle";
import { getUserHex } from "./functions/getUserHex";

/**
 * Defines a collection of commands for a game server.
 */
export const __commandSystem = {
  /**
   * Teleports the player to the marker on the map.
   * @param source - The player to teleport.
   */
  tpm: {
    event: (source: any) => {
      console.log("tpm trigger");
      emitNet("teleportToMarker", source[0]);
    },
    async: true,
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
    event: (source: any) => CreateWorldVehicle(source[0], source[1]),

    async: true,
    restricted: true,
    description: "Spawns a vehicle",
    usage: "/car [model]",
  },
  /**
   * Lists models of cars.
   * @param source - The player to list the models for.
   */
  cars: {
    event: (source: any) => {
      emitNet("chat:addMessage", source[0], {
        multiline: true,
        args: [
          "Me",
          "kanjo, previon, hakuchou2,  rrocket, dominator3, gauntlet4, dominator7, yosemite2, caracara2, everon, rebla, tailgater2, jester3, paragon, paragon2, penumbra2",
        ],
      });
    },
    async: true,
    restricted: true,
    description: "Lists Models I Like",
    usage: "/cars",
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
  /**
   * Respawns the player.
   * @param source - The player to respawn.
   */
  respawn: {
    event: (source: any) => {
      emitNet("respawnPlayer", source[0]);
    },
    async: true,
    restricted: true,
    description: "Respawns the player",
    usage: "/respawn",
  },
  /**
   * Gets the player's current position & logs to a file.
   * @param source - The player to get the position of.
   */
  loc: {
    event: (source: any) => {
      emit("getLoc", source[0], source[1]);
    },
    async: true,
    restricted: true,
    description: "Gets the player's current position & logs to a file",
    usage: "/loc [name of location]",
  },
  playSound: {
    event: (source: any) => {
      emitNet("playSoundFrontEnd", -1);
    },
    async: true,
    restricted: true,
    description: "Plays a sound",
    usage: "/playSound [sound]",
  },
  addDoor: {
    event: async (source: any) => {
      await addNewDoor(source[0], source[1]);
    },
    async: true,
    restricted: true,
    description: "Adds a door",
    usage:
      "/addDoor [doorId] [lockedHeading] [openHeading] [locked] [canOpen] [double] [lockedHeading2] [openHeading2]",
  },
};
