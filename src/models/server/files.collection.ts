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
    databases.createStringAttribute(db, filesCollection, "fileId", 100, true),
    databases.createStringAttribute(
      db,
      filesCollection,
      "uploadedBy",
      50,
      true
    ),
    databases.createBooleanAttribute(
      db,
      filesCollection,
      "isPasswordEnabled",
      true
    ),
    databases.createStringAttribute(
      db,
      filesCollection,
      "password",
      100,
      false
    ),
  ]);

  console.log("created : files attributes");
}
