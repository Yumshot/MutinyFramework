import { ADAPTIVE_CARD } from "./constants/adaptive";
import { PRIORITY_CHECK } from "./functions/priority";

on(
  "playerConnecting",
  (
    name: any,
    setKickReason: any,
    deferrals: {
      defer: () => void;
      update: (arg0: string) => void;
      done: (arg0?: string) => void;
      presentCard: any;
    }
  ) => {
    deferrals.defer();
    const src = source as unknown as string;
    setTimeout(() => {
      deferrals.update(`Hello ${name}. Initalizing Checks.`);
      let steamIdentifier: string = null;
      let discordIdentifier: string = null;

      for (let i = 0; i < GetNumPlayerIdentifiers(src); i++) {
        const identifier = GetPlayerIdentifier(src, i);

        if (identifier.includes("steam:")) {
          steamIdentifier = identifier;
        }

        if (identifier.includes("discord:")) {
          discordIdentifier = identifier;
        }
      }
      setTimeout(async () => {
        if (steamIdentifier === null) {
          deferrals.done(
            "You are not connected to Steam, Close Fivem, Open Steam & Reconnect"
          );
        } else if (discordIdentifier === null) {
          deferrals.done(
            "You are not connected to Discord, Close Fivem, Open Discord & Reconnect"
          );
        } else {
          deferrals.update("Everything Checks Out, Joining Queue....");
          const options = {
            name: name,
            steam: steamIdentifier,
            discord: discordIdentifier,
          };
          const DB_ENTRY = await PRIORITY_CHECK(options);
          if (!DB_ENTRY)
            return deferrals.done(
              "An Error Occurred, Please report this issue to Server Developers"
            );
          const defCard = ADAPTIVE_CARD(99, name, "Yeaaah Hommmeeeh!");
          deferrals.presentCard(defCard);
          setTimeout(() => {
            deferrals.done();
          }, 15000);
        }
      }, 2500);
    }, 0);
  }
);
