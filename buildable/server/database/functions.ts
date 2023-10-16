import { DATABASE_COLLECTION_USERS } from "database/init";
import { findSteam } from "utils/functions";

export const GATHER_USER_DATA_FOR_SERVER = async (src: string | number) => {
const query = findSteam(src);
const user = await DATABASE_COLLECTION_USERS.findOne(query);

if (!user) return null;
return user;
}