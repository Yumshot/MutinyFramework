import Database from "modules/database/db";
/**
 * Creates a new instance of the Database class to be used for player connection events.
 */
const __database = new Database();
/**
 * The instance of the database class to be used for events.
 */
export const __databaseInstance = __database;

import "./index";
