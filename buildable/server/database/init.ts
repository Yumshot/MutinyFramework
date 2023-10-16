import { Collection, MongoClient } from "mongodb";
import { Logger } from "utils/logger";
let DATABASE: MongoClient;
const Log = new Logger();
export let DATABASE_COLLECTION_USERS: Collection;
async function main() {
  // 4. Connect to MongoDB
  MongoClient.connect("mongodb://127.0.0.1:27017/mutiny_roleplay")
    .then((res) => {
      Log.infoToDiscord(GetCurrentResourceName().toUpperCase(), {
        title: GetCurrentResourceName().toUpperCase(),
        resource: "(SERVER > DATABASE > INIT > MAIN())",
        count: 1,
        field: "[DATABASE STATUS]",
        content: "CONNECTED",
        color: 7,
      });
      DATABASE = res;
      DATABASE_COLLECTION_USERS = DATABASE.db().collection("users");
    })
    .catch((err) => {
      Log.warnToDiscord(err, {
        title: GetCurrentResourceName().toUpperCase(),
        resource: "(SERVER > DATABASE > INIT > MAIN())",
        count: 1,
        field: "[DATABASE STATUS] - ERROR",
        content: err,
        color: 4,
      });
    });
}

main().catch((err) =>
  Log.warnToDiscord(err, {
    title: GetCurrentResourceName().toUpperCase(),
    resource: "(SERVER > DATABASE > INIT > MAIN())",
    count: 1,
    field: "Function Error",
    content: err,
  })
);
