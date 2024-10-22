import { db } from "../name";
import createFilesCollection from "./files.collection";

import { databases } from "./config";

export default async function getOrCreateDB() {
  try {
    await databases.get(db);
    console.log("db connected");
  } catch (error) {
    try {
      await databases.create(db, db);
      console.log("db created");
      await Promise.all([createFilesCollection()]);

      console.log("collection created");
      console.log("db connected");
    } catch (error: any) {
      console.log(`creating db : `, error.message);
    }
  }

  return databases;
}
