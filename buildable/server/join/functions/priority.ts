import { DATABASE_COLLECTION_USERS } from "database/init";
import { Priority } from "interfaces/Priority";
import { v4 as uuidv4 } from "uuid";
export const PRIORITY_CHECK = async (src: string | number, options: Priority) => {
  let user = await DATABASE_COLLECTION_USERS.findOne(options);
  const document = {
    name: options.name,
    hex: uuidv4(),
    steam: options.steam,
    discord: options.discord,
    priority: 0,
    is_banned: false,
    first_join: true,
    permission_level: 0,
    characters: new Array(),
    last_character: 0,
    ban_info: new Array(),
  };

  if (!user) {
    try {
      await DATABASE_COLLECTION_USERS.insertOne(document);
    } catch (error) {
      return DropPlayer(src as string, "An error occurred. Please report this issue to the server developers.");
    }
    user = await DATABASE_COLLECTION_USERS.findOne(options);
    return user;
  } else {
    return user;
  }
};


