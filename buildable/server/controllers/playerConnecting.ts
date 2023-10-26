import { __databaseInstance } from "server";
import { Delay } from "../modules/utils/delay";
import { FindSteam } from "../modules/utils/querys";
import { IDeferrals } from "../modules/interfaces/IDeferrals";
import BuildFreshUser from "routes/BuildFreshUser";
import { ErrorKeys } from "config/errors";

/**
 * Delays the execution of a function for a specified amount of time.
 * @param ms - The amount of time to delay in milliseconds.
 * @returns A Promise that resolves after the specified delay.
 */
async function d(ms: number = 5000) {
  await Delay(ms);
}

/**
 * Checks if a user is banned based on their Steam ID.
 * @param __query - An object containing the Steam ID of the user to check.
 * @returns A boolean indicating if the user is banned, or null if the user is not found.
 */
async function CheckBan(__steam: string): Promise<boolean | null> {
  try {
    const __userTarget = await __databaseInstance.GetUserData({
      steam_target: __steam,
    });

    if (__userTarget) {
      return !!__userTarget.banned;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Validates a Steam query.
 * @param __query - The Steam query to validate.
 * @returns A boolean indicating whether the query is valid or not.
 */
async function SteamValidate(__steam: string): Promise<boolean> {
  if (__steam === null) {
    await d(1500);
    return false;
  } else {
    await d(1500);
    return true;
  }
}

/**
 * Creates a new user.
 * @param __query - An object containing the Steam ID of the user to create.
 * @param name - The name of the user to create.
 * @param __source - The source of the user to create.
 * @param deferrals - An object containing functions to defer the player's connection and update the connection status.
 */
async function CreateUser(
  __query: string,
  name: string,
  __source: any,
  deferrals: IDeferrals
) {
  deferrals.update(
    `\n ⌠Mutiny Rp⌡ - It seems you are a first time user! \n Creating your credentials!!`
  );
  const __user = await new BuildFreshUser(__query, name, __source).__execute();

  if (__user) {
    await __databaseInstance.SetNewUserData(__user);
  } else {
    deferrals.update(`\n ⌠Mutiny Rp⌡ - Error creating your credentials!`);
    await d();
    return deferrals.done(
      `\n ⌠Mutiny Rp⌡ - Error creating your credentials! \n Please try again! \n If you have received this message more than once, please contact a staff member on discord! \n ${ErrorKeys[0]}`
    );
  }
}

/**
 * Event handler for when a player is connecting to the server.
 * @param name - The name of the player connecting.
 * @param setKickReason - A function to set the reason for kicking the player.
 * @param deferrals - An object containing functions to defer the player's connection and update the connection status.
 */
async function handlePlayerConnecting(
  name: string,
  setKickReason: (reason: string) => void,
  deferrals: IDeferrals
) {
  const __source = global.source;
  const __query = FindSteam(__source);
  deferrals.defer();
  deferrals.update(`\n Welcome to ⌠Mutiny Rp⌡ ${name}!`);

  await d();

  const __steamCheck = await SteamValidate(__query);
  if (!__steamCheck) {
    return deferrals.done(
      `\n ⌠Mutiny Rp⌡ - You must have steam open to join the server!`
    );
  }

  deferrals.update(`\n ⌠Mutiny Rp⌡ - Steam is open!`);

  await d();

  const __banCheck = await CheckBan(__query);
  if (__banCheck) {
    return deferrals.done(`\n ⌠Mutiny Rp⌡ - You are banned from the server!`);
  } else if (__banCheck === null) {
    await CreateUser(__query, name, __source, deferrals);
  } else {
    deferrals.update(`\n ⌠Mutiny Rp⌡ - No ban found!`);
    await d();
    const __user = await __databaseInstance.GetUserData({
      steam_target: __query,
    });
    try {
      await __databaseInstance.UpdateUserData(__query, {
        last_connection: new Date(),
      });
      deferrals.update(`\n ⌠Mutiny Rp⌡ - Credentials updated!`);
      await d();
      //TODO - PRIORITY QUEUE (LOW PRIORITY)
      deferrals.update(
        `\n ⌠Mutiny Rp⌡ - Welcome In, ${name}! \n Enjoy your stay!`
      );
      await d();

      return deferrals.done();
    } catch (error) {
      console.log(error);
      return deferrals.done(
        `\n ⌠Mutiny Rp⌡ - Error updating your credentials! \n Please try again! \n If you have received this message more than once, please contact a staff member on discord! \n ${ErrorKeys[1]}`
      );
    }
  }
}

/**
 * NOTE - Event handler for when a player is connecting to the server.
 * LINK - https://docs.fivem.net/docs/scripting-reference/events/server-events/
 *
 */
on("playerConnecting", handlePlayerConnecting);
