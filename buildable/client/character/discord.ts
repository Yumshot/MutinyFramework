import { Delay } from "utils/functions";

export const DISCORD = {
  WEBHOOK_URL: "",
  APP_ID: "763496995968516117",
  UPDATE_TIME: 45,
  RPT: {
    ACTIVE: true,
    TEXT: "UNDER DEVELOPMENT \n ⌠Mutiny Rp⌡",
  },
  LARGE_IMAGE: {
    ACTIVE: true,
    NAME: "lrg",
    TEXT: "UNDER DEVELOPMENT \n ⌠Mutiny Rp⌡",
  },
  SMALL_IMAGE: {
    ACTIVE: false,
    NAME: "lrg",
    TEXT: "UNDER DEVELOPMENT \n ⌠Mutiny Rp⌡",
  },
  BUTTONS: {
    ACTIVE: true,
    LIST: [
      {
        INDEX: 0,
        LABEL: "CONNECT NOW",
        URL: "fivem://connect/127.0.0.1",
      },
    ],
  },
};
setTick(async () => {
  await Delay(DISCORD.UPDATE_TIME * 1000);
  SetDiscordAppId(DISCORD.APP_ID);

  if (DISCORD.LARGE_IMAGE.ACTIVE) {
    SetDiscordRichPresenceAsset(DISCORD.LARGE_IMAGE.NAME);
  }

  if (DISCORD.SMALL_IMAGE.ACTIVE) {
    SetDiscordRichPresenceAssetSmall(DISCORD.SMALL_IMAGE.NAME);
  }

  if (DISCORD.BUTTONS.ACTIVE) {
    for (let k in DISCORD.BUTTONS.LIST) {
      let v = DISCORD.BUTTONS.LIST[k];
      SetDiscordRichPresenceAction(v.INDEX, v.LABEL, v.URL);
    }
  }

  const updatePresenceText = (
    configText: string,
    defaultText: {
      (presenceState: string): void;
      (text: string): void;
      (text: string): void;
      (arg0: string): void;
    }
  ) => {
    defaultText(configText);
  };

  if (DISCORD.RPT.ACTIVE) {
    if (GetPlayerName(PlayerId()) == "Yumshot") {
      updatePresenceText(DISCORD.RPT.TEXT, SetRichPresence);
    } else {
      updatePresenceText("Testicles", SetRichPresence);
    }
  }

  if (DISCORD.LARGE_IMAGE.ACTIVE) {
    updatePresenceText(
      DISCORD.LARGE_IMAGE.TEXT,
      SetDiscordRichPresenceAssetText
    );
  }

  if (DISCORD.SMALL_IMAGE.ACTIVE) {
    updatePresenceText(
      DISCORD.SMALL_IMAGE.TEXT,
      SetDiscordRichPresenceAssetSmallText
    );
  }
});
