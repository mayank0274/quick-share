import { Permission } from "node-appwrite";
import { filesAttachmentBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {
  try {
    await storage.getBucket(filesAttachmentBucket);
    console.log("storage connected");
  } catch (error) {
    try {
      await storage.createBucket(
        filesAttachmentBucket,
        filesAttachmentBucket,
        [
          Permission.read("any"),
          Permission.create("any"),
          Permission.delete("any"),
        ],
        false,
        undefined,
        undefined
      );
    } catch (error: any) {
      console.log("`creating storage bucket : ", error.message);
    }
  }
}
