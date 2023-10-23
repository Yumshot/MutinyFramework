import { BANNED_WEAPONS_ARRAY } from "./weapons";
import { ATM_MODELS } from "./models";
import { BANNED_PICKUPS } from "./pickups";
import { ADAPTIVE_CARD_QUOTES } from "./adaptive";

export const IS_DEBUGGING: boolean = true;

export const DISCORD = {
  WEBHOOK_URL: "",
  APP_ID: "763496995968516117",
  UPDATE_TIME: 5,
  RPT: {
    ACTIVE: true,
    TEXT: "UNDER DEVELOPMENT \n [MUTINY FRAMEWORK]",
  },
  LARGE_IMAGE: {
    ACTIVE: true,
    NAME: "lrg",
    TEXT: "UNDER DEVELOPMENT \n [MUTINY FRAMEWORK]",
  },
  SMALL_IMAGE: {
    ACTIVE: false,
    NAME: "lrg",
    TEXT: "UNDER DEVELOPMENT \n [MUTINY FRAMEWORK]",
  },
  BUTTONS: {
    ACTIVE: true,
    LIST: [
      {
        INDEX: 0,
        LABEL: "CONNECT NOW",
        URL: "https://cfx.re/join/o48r3v",
      },
    ],
  },
};

export const WEBHOOK_URL =
  "https://discord.com/api/webhooks/1161014807584059503/YoO2egK_YqqbXcat2PmI5-mB-XTyim0ED-Wu8toqSOXaa_0PH29ANc80v6Mq5GDGMg2K";

/**
 * An object containing various locale strings used throughout the application.
 * @property DATABASE - An object containing locale strings for the database.
 * @property SERVER - An object containing locale strings for the server.
 * @property LOG - A string used for logging.
 * @property WEATHER - An object containing locale strings for the weather.
 * @property LOCALES - An object containing locale strings for the server.
 * @property LOCATIONS - An object containing locale strings for the server.
 * @property DEFAULTS - An object containing locale strings for the server.
 * @property BAN_WEAPONS - An object containing locale strings for the server.
 * @property WEATHER_TYPES - An object containing locale strings for the server.
 * @property TARGET_MODELS - An object containing locale strings for the server.
 * @property BASE_MODELS - An object containing locale strings for the server.
 * @property CHARACTER_CREATE_APPEARANCE_CONFIG - An object containing locale strings for the server.
 * @property SPAWN_CAM_LOC - An object containing locale strings for the server.
 * @property IS_DEBUGGING - A boolean used for debugging.
 * @property DISCORD - An object containing locale strings for the server.
 * @property WEBHOOK_URL - A string used for discord webhooks.
 */
/**
 * Global constants for Mutiny Framework.
 * @remarks
 * This file contains the LOCALES constant, which is an object that contains various constants used throughout the framework.
 * @example
 * ```
 * import { LOCALES } from './globals';
 * console.log(LOCALES.SERVER.NAME); // "MUTINY RP"
 * ```
 * @public
 */
/**
 * The locales object contains all the localized strings used in the Mutiny RP server.
 */
export const LOCALES = {
  DATABASE: {
    /**
     * The message displayed when the Mutiny database is connected.
     * @example
     * ```
     * console.log(LOCALES.DATABASE.CONNECT); // "MUTINY DATABASE CONNECTED"
     * ```
     */
    CONNECT: "MUTINY DATABASE CONNECTED",
  },
  SERVER: {
    __MUTINY__: {
      VERSION: "0.0.1",
      BUILD: "0.0.1",
      BUILD_DATE: new Date().toLocaleString(),
      BUILD_TIMESTAMP: Date.now(),
      BUILD_AUTHOR: "Yumshot | <https://github.com/Yumshot>",
    },

    /**
     * The name of the Mutiny RP server.
     * @example
     * ```
     * console.log(LOCALES.SERVER.NAME); // "MUTINY RP"
     * ```
     */
    NAME: "MUTINY RP",
    QUEUE: {
      /**
       * The quotes used in the adaptive card for joining the queue.
       * @example
       * ```
       * console.log(LOCALES.SERVER.QUEUE.JOIN_QUOTES); // ADAPTIVE_CARD_QUOTES
       * ```
       */
      JOIN_QUOTES: ADAPTIVE_CARD_QUOTES,
      /**
       * The title of the adaptive card for the flight itinerary.
       * @example
       * ```
       * console.log(LOCALES.SERVER.QUEUE.CARD_TITLE); // "✈️ Your Flight Itinerary"
       * ```
       */
      CARD_TITLE: "✈️ Your Flight Itinerary",
      /**
       * The title of the section for guests on board in the adaptive card.
       * @example
       * ```
       * console.log(LOCALES.SERVER.QUEUE.GUEST_TITLE); // " 👤 Guests on Board"
       * ```
       */
      GUEST_TITLE: " 👤 Guests on Board",
      /**
       * The message displayed when the player source is invalid.
       * @example
       * ```
       * console.log(LOCALES.SERVER.QUEUE.NO_SOURCE); // "\n Invalid player source"
       * ```
       */
      NO_SOURCE: "\n Invalid player source",
      /**
       * The message displayed when Steam is not running to join the server.
       * @example
       * ```
       * console.log(LOCALES.SERVER.QUEUE.NO_STEAM); // "\n You must have steam running to join the server."
       * ```
       */
      NO_STEAM: "\n You must have steam running to join the server.",
      /**
       * The message displayed when Discord is not running to join the server.
       * @example
       * ```
       * console.log(LOCALES.SERVER.QUEUE.NO_DISCORD); // "\n You must have discord running to join the server."
       * ```
       */
      NO_DISCORD: "\n You must have discord running to join the server.",
      /**
       * The message displayed when the player is kicked from the server.
       * @example
       * ```
       * console.log(LOCALES.SERVER.QUEUE.KICK_MESSAGE); // "\n You have been kicked from the server."
       * ```
       */
      KICK_MESSAGE: "\n You have been kicked from the server.",
      /**
       * The message displayed when the player is banned from the server.
       * @example
       * ```
       * console.log(LOCALES.SERVER.QUEUE.BANNED_MESSAGE); // "You are Banned."
       * ```
       */
      BANNED_MESSAGE: "You are Banned.",
      /**
       * The message displayed when the player is in the queue.
       * @example
       * ```
       * console.log(LOCALES.SERVER.QUEUE.QUEUE_MESSAGE); // "You are in the queue."
       * ```
       */
      QUEUE_MESSAGE: "You are in the queue.",
      /**
       * The message displayed when the player's queue position is checked.
       * @example
       * ```
       * console.log(LOCALES.SERVER.QUEUE.QUEUE_POSITION); // "Queue Position: "
       * ```
       */
      QUEUE_POSITION: "Queue Position: ",
      /**
       * The message displayed when the player's queue time is checked.
       * @example
       * ```
       * console.log(LOCALES.SERVER.QUEUE.QUEUE_TIME(10)); // "Queue: 10"
       * ```
       * @param seconds - The number of seconds in the queue.
       */
      QUEUE_TIME: (seconds: any) => {
        return `Queue: ${seconds}`;
      },
      /**
       * The message displayed when the player's identifiers are compared to the database.
       * @example
       * ```
       * console.log(LOCALES.SERVER.QUEUE.DATABASE_CHECK); // "\n Comparing Identifiers to Database"
       * ```
       */
      DATABASE_CHECK: "\n Comparing Identifiers to Database",
      /**
       * The message displayed when the user is not found in the database and a new user is created.
       * @example
       * ```
       * console.log(LOCALES.SERVER.QUEUE.DATABASE_NO_USER); // "\n User not Found \n Creating a new user.."
       * ```
       */
      DATABASE_NO_USER: "\n User not Found \n Creating a new user..",
      /**
       * The message displayed when an error occurs while inserting a user into the database.
       * @example
       * ```
       * console.log(LOCALES.SERVER.QUEUE.DATABASE_INSERT_ERROR); // "\n An error occurred. \n Please report this issue to the server developers."
       * ```
       */
      DATABASE_INSERT_ERROR:
        "\n An error occurred. \n Please report this issue to the server developers.",
      /**
       * The message displayed when the user is found in the database and their priority is being checked.
       * @example
       * ```
       * console.log(LOCALES.SERVER.QUEUE.DATABASE_USER_FOUND); // "\n User Found. \n Checking your priority.."
       * ```
       */
      DATABASE_USER_FOUND: "\n User Found. \n Checking your priority..",
      /**
       * The message displayed when a new user is added to the database.
       * @example
       * ```
       * console.log(LOCALES.SERVER.QUEUE.WELCOME_NEW_USER); // "\n Welcome to MutinyRP \n You are now in the database. \n Please wait while we check your priority.."
       * ```
       */
      WELCOME_NEW_USER:
        "\n Welcome to MutinyRP \n You are now in the database. \n Please wait while we check your priority..",
      /**
       * The message displayed when the player is joining the server.
       * @example
       * ```
       * console.log(LOCALES.SERVER.QUEUE.JOINING); // "Joining Now!!!"
       * ```
       */
      JOINING: "Joining Now!!!",
    },
  },
  /**
   * The log message prefix for Mutiny Core.
   * @example
   * ```
   * console.log(LOCALES.LOG); // "MUTINY:CORE:LOG"
   * ```
   */
  LOG: "MUTINY:CORE:LOG",
  WEATHER: {
    /**
     * The message displayed when the weather is changed.
     * @example
     * ```
     * console.log(LOCALES.WEATHER.CHANGE_WEATHER + "Sunny"); // "CHANGING WEATHER TO : Sunny"
     * ```
     */
    CHANGE_WEATHER: "CHANGING WEATHER TO : ",
    /**
     * The message displayed when the last weather is checked.
     * @example
     * ```
     * console.log(LOCALES.WEATHER.LAST_WEATHER + "Rainy"); // "LAST WEATHER WAS : Rainy"
     * ```
     */
    LAST_WEATHER: "LAST WEATHER WAS : ",
  },
  NOTIFICATIONS: {
    HR_ICON: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M27 10h-6a3.003 3.003 0 0 0-3 3v6a2.002 2.002 0 0 0 2 2v7a2.002 2.002 0 0 0 2 2h4a2.002 2.002 0 0 0 2-2v-7a2.002 2.002 0 0 0 2-2v-6a3.003 3.003 0 0 0-3-3zm1 9h-2v9h-4v-9h-2v-6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" fill="currentColor"></path><path d="M20 5a4 4 0 1 1 4 4a4.004 4.004 0 0 1-4-4zm2 0a2 2 0 1 0 2-2a2.002 2.002 0 0 0-2 2z" fill="currentColor"></path><path d="M14 16v-3a3.003 3.003 0 0 0-3-3H5a3.003 3.003 0 0 0-3 3v3H0v2h16v-2zM4 13a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3H4z" fill="currentColor"></path><path d="M4 5a4 4 0 1 1 4 4a4.004 4.004 0 0 1-4-4zm2 0a2 2 0 1 0 2-2a2.002 2.002 0 0 0-2 2z" fill="currentColor"></path></svg>`,
    DOCK_WORKER_ICON: ` <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2-1a2.4 2.4 0 0 1 2-1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2-1a2.4 2.4 0 0 1 2-1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2-1"></path><path d="M4 18l-1-5h18l-2 4"></path><path d="M5 13V7h8l4 6"></path><path d="M7 7V3H6"></path></g></svg>`,
  },
};

export const LOCATIONS = {
  DEFAULT_SPAWN: { x: 7614.787, y: 1064.8, z: 1678.407 },
  DEFAULT_CAYO: { x: 4446.048, y: -4506.95, z: 3.574 },
  TESTING_POINT: { x: -729.5062866210938, y: -1315.9725341796876, z: 2.0 },
  TESTING_POINT_2: {
    x: 1459.1693115234375,
    y: -1930.8311767578125,
    z: 71.80451965332031,
    heading: 80.43378448486328,
  },
};

/**
 * Default values used throughout the application.
 */
export const DEFAULTS = {
  /** @example 1 second */
  DELAY_1: 1000, // 1 second
  /** @example 5 seconds */
  DELAY_5: 5000, // 5 seconds
  /** @example 10 seconds */
  DELAY_10: 10000, // 10 seconds
  /** @example 15 seconds */
  DELAY_15: 15000, // 15 seconds
  /** @example 30 seconds */
  DELAY_30: 30000, // 30 seconds
  /** @example 60 seconds */
  DELAY_60: 60000, // 60 seconds

  /**
   * Calculates the delay in milliseconds for a given number of hours.
   * @param hours - The number of hours to calculate the delay for.
   * @returns The delay in milliseconds.
   * @example DELAY_HOURS(1) // 3600000 (1 hour)
   */
  DELAY_HOURS: (hours: number) => {
    return hours * 60 * 60 * 1000;
  },

  AUTOPILOT_SPEED_1: 25.0,
  AUTOPILOT_SPEED_2: 50.0,
  AUTOPILOT_DRIVE_MODIFIERS: [447, 787261],
};

/**
 * Object containing banned pickups and weapons.
 */
export const BAN_WEAPONS = {
  PICKUPS: BANNED_PICKUPS,
  WEAPONS: BANNED_WEAPONS_ARRAY,
};

export const WEATHER_TYPES = [
  "EXTRASUNNY",
  "CLEAR",
  "CLEARING",
  "OVERCAST",
  "SMOG",
  "FOGGY",
  "CLOUDS",
  "RAIN",
  "THUNDER",
  "SNOWLIGHT",
];

export const TARGET_MODELS = {
  ATMS: ATM_MODELS,
};

export const BASE_MODELS = ["mp_m_freemode_01", "mp_f_freemode_01"];

export const CHARACTER_CREATE_APPEARANCE_CONFIG = {
  ped: true,
  headBlend: true,
  faceFeatures: true,
  headOverlays: true,
  components: true,
  props: true,
  allowExit: false,
  tattoos: false,
};

export const SPAWN_CAM_LOC = {
  x: 4845.76025390625,
  y: -4929.52001953125,
  z: 30.754070281982422,
  heading: 271.0299072265625,
  rotation: [-42.83732223510742, 0, -93.886474609375],
};
