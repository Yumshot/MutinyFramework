import { Delay } from "utils/functions";
import { DISCORD } from "../../common/globals";
import { DiscordRichPresence } from "handlers/discord";

setTick(async () => {
  await Delay(DISCORD.UPDATE_TIME * 1000);
  DiscordRichPresence();
});
