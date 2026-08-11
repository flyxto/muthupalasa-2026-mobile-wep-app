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

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) return clientPromise;

  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }
  
  // Clean up the URI by trimming spaces and removing accidental double/single quotes from Vercel env settings
  let uri = process.env.MONGODB_URI.trim();
  if (uri.startsWith('"') && uri.endsWith('"')) uri = uri.slice(1, -1);
  if (uri.startsWith("'") && uri.endsWith("'")) uri = uri.slice(1, -1);
  uri = uri.trim();

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error(`The MONGODB_URI is invalid (does not start with mongodb:// or mongodb+srv://). It currently starts with: "${uri.substring(0, 15)}..."`);
  }

  const options: MongoClientOptions = {};

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
  
  return clientPromise;
}

export { getClientPromise };

// Keep the default export but make it a getter or just export the function if needed, 
// though exporting the promise directly was the old way. We can export a proxy or just update getDb to use getClientPromise.

export const DEFAULT_DB_NAME = process.env.MONGODB_DB || "muthupalasa";
export const INVITATIONS_COLLECTION = process.env.MONGODB_COLLECTION || "mp-hambanthota-invitation";

export async function getDb(dbName: string = process.env.MONGODB_DB || DEFAULT_DB_NAME): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}

export async function getInvitationsCollection(): Promise<Collection> {
  const db = await getDb();
  return db.collection(process.env.MONGODB_COLLECTION || INVITATIONS_COLLECTION);
}
