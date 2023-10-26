import { Collection, MongoClient, ServerApiVersion } from "mongodb";
import { __databaseLocales } from "../../config/globals";
import { ICreateUser } from "modules/interfaces/ICreateUser";

/**
 * Represents a database connection and provides access to collections.
 */
export default class Database {
  /** The MongoDB client instance. */
  public __database: MongoClient;
  /** The "users" collection. */
  public __databaseCollectionUsers: Collection;
  /** The "characters" collection. */
  public __databaseCollectionCharacters: Collection;
  /** The "garages" collection. */
  public __databaseCollectionGarages: Collection;
  /** The "housing" collection. */
  public __databaseCollectionHousing: Collection;

  /**
   * Creates a new instance of the Database class.
   */
  constructor() {
    this.__database = new MongoClient(__databaseLocales.connection, {
      serverApi: {
        version: ServerApiVersion.v1,
        deprecationErrors: true,
      },
    });
    this.__database.connect().then(async (_res) => {
      this.__databaseCollectionUsers = this.__database
        .db("mutiny_roleplay")
        .collection("users");
      this.__databaseCollectionCharacters = this.__database
        .db("mutiny_roleplay")
        .collection("characters");
      this.__databaseCollectionGarages = this.__database
        .db("mutiny_roleplay")
        .collection("garages");
      this.__databaseCollectionHousing = this.__database
        .db("mutiny_roleplay")
        .collection("housing");
    });
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
   * Gets the "characters" collection.
   * @returns A Promise that resolves to the "characters" collection.
   */
  public async GetCharactersCollection(): Promise<Collection> {
    try {
      return this.__databaseCollectionCharacters;
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
  public async SetNewUserData(data: any): Promise<void> {
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
}
