import { DISCORD } from "../../common/globals";

/**
 * Sets the Discord Rich Presence for the client.
 */
export const DiscordRichPresence = () => {
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

  /**
   * Updates the presence text for the Rich Presence.
   * @param configText The text to set as the presence text.
   * @param defaultText The default text to set if the config text is not valid.
   */
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
};
