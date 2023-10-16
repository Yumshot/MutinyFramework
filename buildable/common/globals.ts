import { BANNED_WEAPONS_ARRAY } from "./weapons";
import { ATM_MODELS } from "./models";
import { BANNED_PICKUPS } from "./pickups";

export const IS_DEBUGGING: boolean = true;
export const DISCORD = {
  WEBHOOK_URL: "",
  APP_ID: "763496995968516117",
  UPDATE_TIME: 5,
  RPT: {
    ACTIVE: true,
    TEXT: "UNDER DEVELOPMENT \n [MUTINY FRAMEWORK]"
  },
  LARGE_IMAGE: {
    ACTIVE: true,
    NAME: "lrg",
    TEXT: "UNDER DEVELOPMENT \n [MUTINY FRAMEWORK]"

  },
  SMALL_IMAGE: {
    ACTIVE: false,
    NAME: 'lrg',
    TEXT: "UNDER DEVELOPMENT \n [MUTINY FRAMEWORK]"

  },
  BUTTONS: {
    ACTIVE: true,
    LIST: [{
      INDEX:0,
      LABEL: "CONNECT NOW",
      URL: "fivem://connect/127.0.0.1"
    }]
  },


  
}
export const WEBHOOK_URL =
  "https://discord.com/api/webhooks/1161014807584059503/YoO2egK_YqqbXcat2PmI5-mB-XTyim0ED-Wu8toqSOXaa_0PH29ANc80v6Mq5GDGMg2K";

export const DATABASE = {
  NAME: "mutiny_roleplay_server",
  COLLECTION: "users",
  URI: "mongodb://localhost:27017",
};

export const LOCALES = {
  SERVER: { NAME: "MUTINY ROLEPLAY" },
  LOG: "MUTINY:CORE:LOG",
  WEATHER: {
    CHANGE_WEATHER: "CHANGING WEATHER TO : ",
    LAST_WEATHER: "LAST WEATHER WAS : ",
  },
};

export const LOCATIONS = {
  DEFAULT_SPAWN: { x: 7614.787, y: 1064.8, z: 1678.407 },
  DEFAULT_CAYO: { x: 4446.048, y: -4506.95, z: 3.574 },
  TESTING_POINT: { x: -729.5062866210938, y: -1315.9725341796876, z: 2.0 }
};

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

export const MODELS = {
  ATMS: ATM_MODELS,
};
