import { DATABASE_COLLECTION_USERS } from "init";

export interface IPriority {
  name: string;
  steam: string;
  discord: string;
  priority?: number;
  is_banned?: boolean;
  first_join?: boolean;
  characters?: [];
  ban_info?: [];
}

export const PRIORITY_CHECK = async (options: IPriority) => {
  let user = await DATABASE_COLLECTION_USERS.findOne(options);
  const document = {
    name: options.name,
    steam: options.steam,
    discord: options.discord,
    priority: 0,
    is_banned: false,
    first_join: true,
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
