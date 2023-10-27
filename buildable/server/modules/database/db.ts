import { Collection, MongoClient, ServerApiVersion } from "mongodb";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5e31beb (refactor(config): update database const to drop locales from it, import fix.)
import { __database } from "../../config/globals";
import { IUser } from "modules/interfaces/IUser";
import { ICharacter } from "modules/interfaces/ICharacter";
=======
import { __databaseLocales } from "../../config/globals";
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 9b889d0 (Massive update to the server, this is a complete rewrite of the server.)
=======
import { ICreateUser } from "modules/interfaces/ICreateUser";
>>>>>>> 07e9200 (chore(db, build, builduser): update db.ts / add new user / add new route / update client / update build script)
=======
import { IUser } from "modules/interfaces/IUser";
import { ICharacter } from "modules/interfaces/ICharacter";
>>>>>>> b5e75a5 (refactor(client): move old files to old folder)

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
<<<<<<< HEAD
<<<<<<< HEAD
    this.__database = new MongoClient(__database.connection, {
=======
    this.__database = new MongoClient(__databaseLocales.connection, {
>>>>>>> 9b889d0 (Massive update to the server, this is a complete rewrite of the server.)
=======
    this.__database = new MongoClient(__database.connection, {
>>>>>>> 5e31beb (refactor(config): update database const to drop locales from it, import fix.)
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
<<<<<<< HEAD
  public async SetNewUserData(data: IUser): Promise<void> {
=======
  public async SetNewUserData(data: any): Promise<void> {
>>>>>>> 9b889d0 (Massive update to the server, this is a complete rewrite of the server.)
    try {
      await this.__databaseCollectionUsers.insertOne(data);
    } catch (e) {
      console.log(e);
    }
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 07e9200 (chore(db, build, builduser): update db.ts / add new user / add new route / update client / update build script)
  /**
   * Updates user data in the database.
   * @param data - The data to update.
   * @returns A Promise that resolves when the update is complete.
   */
  public async UpdateUserData(target: string, query: any): Promise<void> {
<<<<<<< HEAD
    try {
      await this.__databaseCollectionUsers.updateOne(
        { steam_target: target },
        { $set: query }
=======
  public async UpdateUserData(data: any): Promise<void> {
    try {
      await this.__databaseCollectionUsers.updateOne(
        { steam_target: data.steam_target },
        { $set: data }
>>>>>>> 9b889d0 (Massive update to the server, this is a complete rewrite of the server.)
=======
    try {
      await this.__databaseCollectionUsers.updateOne(
        { steam_target: target },
        { $set: query }
>>>>>>> 07e9200 (chore(db, build, builduser): update db.ts / add new user / add new route / update client / update build script)
      );
    } catch (e) {
      console.log(e);
    }
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 07e9200 (chore(db, build, builduser): update db.ts / add new user / add new route / update client / update build script)
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
<<<<<<< HEAD
    }
  }

  /**
   * Retrieves character data for a user from the database.
   * @param query - The query to find the user's character data.
   * @returns A Promise that resolves to the user's character data, or null if an error occurs.
   */
  public async GetUsersCharacterData(query: any): Promise<any> {
    try {
      const __user = await this.__databaseCollectionCharacters.findOne(query);
      return __user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async SetNewCharacterData(data: ICharacter): Promise<void> {
    try {
      await this.__databaseCollectionCharacters.insertOne(data);
    } catch (e) {
      console.log(e);
=======
  private CheckDate(date: Date): Date {
    if (date) {
      return date;
    } else {
      return new Date();
>>>>>>> 9b889d0 (Massive update to the server, this is a complete rewrite of the server.)
=======
>>>>>>> 07e9200 (chore(db, build, builduser): update db.ts / add new user / add new route / update client / update build script)
    }
  }

  /**
   * Retrieves character data for a user from the database.
   * @param query - The query to find the user's character data.
   * @returns A Promise that resolves to the user's character data, or null if an error occurs.
   */
  public async GetUsersCharacterData(query: any): Promise<any> {
    try {
      const __user = await this.__databaseCollectionCharacters.findOne(query);
      return __user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async SetNewCharacterData(data: ICharacter): Promise<void> {
    try {
      await this.__databaseCollectionCharacters.insertOne(data);
    } catch (e) {
      console.log(e);
    }
  }
}
