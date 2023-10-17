import { Delay } from "utils/functions";
import { ADAPTIVE_CARD } from "./constants/adaptive";
import { PRIORITY_CHECK } from "./functions/priority";
import { funnyCommit } from "./functions/quotes";

// Define the event handler for playerConnecting
on(
  "playerConnecting",
  async (
    name: string, // The name of the player connecting
    setKickReason: (reason: string) => void, // Function to set the kick reason
    deferrals: {
      defer: () => void; // Function to defer the connection
      update: (message: string) => void; // Function to update the connection message
      done: (reason?: string) => void; // Function to complete the connection
      presentCard: any; // Function to present an adaptive card (not used)
    }
  ) => {
    // Defer the connection to perform checks
    deferrals.defer();

    // Get the player source
    const src = source as unknown as string;

    // Check if the source is valid
    if (!src) {
      setKickReason("Invalid player source");
      deferrals.done();
      return;
    }

    // Check player identifiers for Steam and Discord
    let steamIdentifier: string | null = null;
    let discordIdentifier: string | null = null;
    let ipIdentifier: string | null = null;

    for (let i = 0; i < GetNumPlayerIdentifiers(src); i++) {
      const identifier = GetPlayerIdentifier(src, i);
      if (identifier.startsWith("steam:")) {
        steamIdentifier = identifier;
      }

      if (identifier.startsWith("discord:")) {
        discordIdentifier = identifier;
      }

      if (identifier.startsWith("ip:")) {
        ipIdentifier = identifier;
      }
    }

    // Check if the player is connected to Steam and Discord
    if (!steamIdentifier) {
      setKickReason("You are not connected to Steam. Please connect to Steam and try again.");
      deferrals.done();
      return;
    }

    if (!discordIdentifier) {
      setKickReason("You are not connected to Discord. Please connect to Discord and try again.");
      deferrals.done();
      return;
    }
    // Add the player to the priority queue
    const options = {
      name: name,
      //!TODO - add IP to the Connection Options interface
      ip: GetPlayerEndpoint(src) || ipIdentifier,
      steam: steamIdentifier,
      discord: discordIdentifier,
    };
    const dbEntry = await PRIORITY_CHECK(src, options);
    if (!dbEntry) {
      setKickReason("An error occurred. Please report this issue to the server developers.");
      deferrals.done();
      return;
    }

    deferrals.update("Checking Queue Information...");
    await Delay(5000);
    simulateQueue(deferrals, name);
  }
);

const simulateQueue = async (deferrals: any, name: string) => {
  deferrals.update("Checking Queue Information...");
  // Simulate a queue
  await Delay(5000);
  // Send the adaptive card
  const defCard = ADAPTIVE_CARD(99, name, funnyCommit().toString());
  deferrals.presentCard(defCard);
  await Delay(15000);
  // Complete the connection
  deferrals.done();
};