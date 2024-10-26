import { Client, Databases, Storage } from "appwrite";
import env from "@/app/env";

const client = new Client()
  .setEndpoint(env.appWrite.endpoint)
  .setProject(env.appWrite.projectId);

const databases = new Databases(client);
const storage = new Storage(client);

export { client, databases, storage };
