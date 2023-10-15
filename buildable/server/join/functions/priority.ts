import { DATABASE_COLLECTION_USERS } from "init";
import { Priority } from "utils/interfaces/Priority";

export const PRIORITY_CHECK = async (options: Priority) => {
  let user = await DATABASE_COLLECTION_USERS.findOne(options);
  const document = {
    name: options.name,
    steam: options.steam,
    discord: options.discord,
    priority: 0,
    is_banned: false,
    first_join: true,
    permission_level: 0,
    characters: new Array(),
    ban_info: new Array(),
  };

  if (!user) {
    DATABASE_COLLECTION_USERS.insertOne(document);
    user = await DATABASE_COLLECTION_USERS.findOne(options);
    return user;
  } else {
    return user;
  }
};
