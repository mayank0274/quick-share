import { Permission } from "node-appwrite";
import { db, filesCollection } from "../name";
import { databases } from "./config";

export default async function createFilesCollection() {
  await databases.createCollection(db, filesCollection, filesCollection, [
    Permission.read("any"),
    Permission.create("any"),
    Permission.delete("any"),
  ]);

  console.log("created : files  collection");

  await Promise.all([
    databases.createStringAttribute(db, filesCollection, "file_id", 100, true),
    databases.createStringAttribute(
      db,
      filesCollection,
      "sender_email",
      50,
      true
    ),
  ]);

  console.log("created : comment attributes");
}
