import { Collection, MongoClient } from "mongodb";
let DATABASE: MongoClient;
export let DATABASE_COLLECTION_USERS: Collection;
async function main() {
  // 4. Connect to MongoDB
  MongoClient.connect("mongodb://127.0.0.1:27017/mutiny_roleplay")
    .then((res) => {
      console.log("DATABASE CONNECTED");
      DATABASE = res;
      DATABASE_COLLECTION_USERS = DATABASE.db().collection("users");
    })
    .catch((err) => {
      console.log(err);
    });
}

main().catch((err) => console.log(err));
