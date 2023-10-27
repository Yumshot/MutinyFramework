import { DATABASE_COLLECTION_USERS } from "old/database/init";
import { findSteam } from "modules/utils/functions";

export const GATHER_USER_DATA_FOR_SERVER = async (src: string | number) => {
  const query = findSteam(src);
  const user = await DATABASE_COLLECTION_USERS.findOne(query);

  if (!user) return null;
  return user;
};

export const GATHER_USER_LAST_CHARACTER_FOR_SERVER = async (
  src: string | number
) => {
  const query = findSteam(src);
  const user = await DATABASE_COLLECTION_USERS.findOne(query);

  if (!user) return null;

  const lastCharacter = user.last_character;
  return lastCharacter;
};
