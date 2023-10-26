import { Collection, MongoClient } from "mongodb";
let DATABASE: MongoClient;

export let DATABASE_COLLECTION_USERS: Collection;
async function main() {
  // 4. Connect to MongoDB
  MongoClient.connect("mongodb://127.0.0.1:27017/mutiny_roleplay")
    .then(async (res) => {
        DATABASE = res;
          StartLog();
        DATABASE_COLLECTION_USERS = DATABASE.db().collection("users");
    })
    .catch((err) => {
        console.log(err);
    });
}

main().catch((err) =>
    {
        console.log(err);
    }
);

function StartLog() {
    console.log("Database - ", "Connected to ⌠Mutiny Rp⌡ Database")
    console.log("Database - ", "Gathering Collections")
    console.log("Database - ", "Loaded Collections")
    console.log("Database - ", "Updating Connector Export")
}