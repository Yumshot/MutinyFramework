import { Collection, MongoClient, ServerApiVersion } from "mongodb";
import { __database } from "../../config/globals";
import { IUser } from "config/interfaces/IUser";
import { __databaseLocales } from "../../config/globals";
import { DoorInsert } from "modules/utils/doors";
import { ICharacterData } from "config/interfaces/ICharacter";

/**
 * Represents a database connection and provides access to collections.
 */
export default class Database {
  /** The MongoDB client instance. */
  public __database: MongoClient;
  /** The "users" collection. */
  public __databaseCollectionUsers: Collection;

  /** The "garages" collection. */
  public __databaseCollectionGarages: Collection;
  /** The "housing" collection. */
  public __databaseCollectionHousing: Collection;

  public __databaseDoors: Collection;

  /**
   * Creates a new instance of the Database class.
   */
  constructor() {
    this.__database = new MongoClient(__database.connection, {
      serverApi: {
        version: ServerApiVersion.v1,
        deprecationErrors: true,
      },
    });
    this.__database.connect().then(async (_res) => {
      this.__databaseCollectionUsers = this.__database
        .db("mutiny_roleplay")
        .collection("users");

      this.__databaseCollectionGarages = this.__database
        .db("mutiny_roleplay")
        .collection("garages");
      this.__databaseCollectionHousing = this.__database
        .db("mutiny_roleplay")
        .collection("housing");
    });
    this.__databaseDoors = this.__database
      .db("mutiny_roleplay")
      .collection("doors");
  }

  /**
   * Gets the "users" collection.
   * @returns A Promise that resolves to the "users" collection.
   */
  public async GetUsersCollection(): Promise<Collection> {
    try {
      return this.__databaseCollectionUsers;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * Gets the "garages" collection.
   * @returns A Promise that resolves to the "garages" collection.
   */
  public async GetGaragesCollection(): Promise<Collection> {
    try {
      return this.__databaseCollectionGarages;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * Gets the "housing" collection.
   * @returns A Promise that resolves to the "housing" collection.
   */
  public async GetHousingCollection(): Promise<Collection> {
    try {
      return this.__databaseCollectionHousing;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * Inserts new user data into the database collection.
   * @param data The data to be inserted.
   * @returns A Promise that resolves when the data has been inserted.
   */
  public async SetNewUserData(data: IUser): Promise<void> {
    try {
      await this.__databaseCollectionUsers.insertOne(data);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Updates user data in the database.
   * @param data - The data to update.
   * @returns A Promise that resolves when the update is complete.
   */
  public async UpdateUserData(target: string, query: any): Promise<void> {
    try {
      await this.__databaseCollectionUsers.updateOne(
        { steam_target: target },
        { $set: query }
      );
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Gets user data from the database.
   * @param query - The query to use to find the user.
   * @returns A Promise that resolves to the user data.
   */
  public async GetUserData(query: any): Promise<any> {
    try {
      const __user = await this.__databaseCollectionUsers.findOne(query);
      return __user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * Retrieves character data for a user from the database.
   * @param query - The query to find the user's character data.
   * @returns A Promise that resolves to the user's character data, or null if an error occurs.
   */
  public async GetUsersCharacterData(query: any): Promise<any> {
    try {
      const __user = await this.__databaseCollectionUsers.findOne(query);
      return __user.characters;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async InsertNewCharacterToUserCharacterData(query: {
    steam_target: string;
    composition: any;
  }) {
    try {
      await this.__databaseCollectionUsers.updateOne(
        {
          steam_target: query.steam_target,
        },
        {
          $push: {
            characters: query.composition,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  public async CountCharactersForUser(query: any): Promise<number> {
    try {
      const agg = [
        {
          $match: query,
        },
        {
          $project: {
            characters: {
              $size: "$characters",
            },
          },
        },
      ];
      const coll = this.__databaseCollectionUsers;
      const cursor = coll.aggregate(agg);
      const result = await cursor.toArray();
      return result[0].characters;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  public async GatherDoorData(): Promise<any> {
    try {
      const __doors = await this.__databaseDoors.find({}).toArray();
      return __doors;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  public async UpdateDoorStatus(doorId: number, state: boolean): Promise<any> {
    try {
      console.log(state);
      const __doors = await this.GatherDoorData();
      const targetDoor = __doors[0].global_doors.find(
        (door: any) => door.id === doorId
      );
      targetDoor.locked = state;
      await this.__databaseDoors.updateOne(
        { _id: __doors[0]._id },
        { $set: { global_doors: __doors[0].global_doors } }
      );
    } catch (error) {
      console.log(error);
    }
  }
  public async InsertNewDoor(query: DoorInsert) {
    try {
      const __doors = await this.GatherDoorData();
      __doors[0].global_doors.push(query);
      await this.__databaseDoors.updateOne(
        { _id: __doors[0]._id },
        { $set: { global_doors: __doors[0].global_doors } }
      );
    } catch (error) {
      console.log(error);
    }
  }
  public async CheckPhoneNumber(query: any): Promise<boolean> {
    try {
      const __user = await this.__databaseCollectionUsers.find({}).toArray();
      const __phoneNumbers = __user.map((user: any) => user.phone_number);
      const __isUnique = __phoneNumbers.includes(query.phone_number);
      return __isUnique;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  public async RemoveCharacterFunds(query: {
    target: ICharacterData;
    amount: number;
  }) {
    //check if user has enough cash, if so, remove cash if not remove bank funds
    try {
      const __user = await this.__databaseCollectionUsers.findOne({
        steam_target: query.target.steam_target,
      });
      const __targetCharacter = __user.characters[query.target.index];
      const __targetCharacterFunds = __targetCharacter.funding;
      console.log(__targetCharacterFunds);
      if (__targetCharacterFunds.cash >= query.amount) {
        __targetCharacterFunds.cash -= query.amount;
      } else {
        //remove funds from bank
        const __bankAccount = __targetCharacterFunds.bank.find(
          (account: any) => account.id === 1
        );
        __bankAccount.balance -= query.amount;
      }
      await this.__databaseCollectionUsers.updateOne(
        { steam_target: query.target.steam_target },
        { $set: { characters: __user.characters } }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
