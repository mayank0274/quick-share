import { Client, Databases, Storage } from "node-appwrite";
import env from "@/app/env";

let client = new Client();

client
  .setEndpoint(env.appWrite.endpoint) // Your API Endpoint
  .setProject(env.appWrite.projectId) // Your project ID
  .setKey(env.appWrite.apikey)
  .setSelfSigned(true);

const databases = new Databases(client);
const storage = new Storage(client);

export { client, databases, storage };
