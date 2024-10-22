import { Client, Databases, Storage } from "appwrite";
import env from "@/app/env";

const client = new Client()
  .setEndpoint(env.appWrite.endpoint) // Your API Endpoint
  .setProject(env.appWrite.projectId); // Your project ID

const databases = new Databases(client);
const storage = new Storage(client);

export { client, databases, storage };
