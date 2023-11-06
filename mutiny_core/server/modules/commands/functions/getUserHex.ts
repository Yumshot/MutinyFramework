import { __databaseInstance } from "server";

export async function getUserHex(source: number, args?: string | number) {
  const __db = __databaseInstance;
  const __steam = getPlayerIdentifiers(source)[0];
  if (!__steam.includes("steam:")) return;
  const __user = await __db.GetUserData({ steam_target: __steam });
  if (!__user) return;
  return await __user.hex;
}
