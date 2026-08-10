import { MongoClient, MongoClientOptions, Db, Collection } from "mongodb";
import fs from "fs";
import path from "path";

// Auto-load .env.local if MONGODB_URI is not set in process.env
if (!process.env.MONGODB_URI) {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf-8");
    for (const line of envConfig.split("\n")) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
        const [key, ...values] = trimmed.split("=");
        process.env[key.trim()] = values.join("=").trim();
      }
    }
  }
}

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI" in .env.local');
}

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export const DEFAULT_DB_NAME = process.env.MONGODB_DB || "muthupalasa";
export const INVITATIONS_COLLECTION = process.env.MONGODB_COLLECTION || "mp-hambanthota-invitation";

export async function getDb(dbName: string = process.env.MONGODB_DB || DEFAULT_DB_NAME): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

export async function getInvitationsCollection(): Promise<Collection> {
  const db = await getDb();
  return db.collection(process.env.MONGODB_COLLECTION || INVITATIONS_COLLECTION);
}
