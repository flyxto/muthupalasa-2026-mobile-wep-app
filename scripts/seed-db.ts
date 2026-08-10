import fs from "fs";
import path from "path";
import clientPromise, { DEFAULT_DB_NAME, INVITATIONS_COLLECTION } from "../lib/mongodb";

const DB_NAME = process.env.MONGODB_DB || DEFAULT_DB_NAME;
const COLLECTION_NAME = process.env.MONGODB_COLLECTION || INVITATIONS_COLLECTION;

async function seedDatabase() {
  console.log("🌱 Starting MongoDB Database Seeding...");

  try {
    const jsonPath = path.resolve(process.cwd(), "data", "invitations.json");
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`Seed data file not found at ${jsonPath}`);
    }

    const fileContent = fs.readFileSync(jsonPath, "utf-8");
    const documents = JSON.parse(fileContent);

    if (!Array.isArray(documents) || documents.length === 0) {
      throw new Error("Seed file does not contain a valid non-empty JSON array.");
    }

    console.log(`📂 Read ${documents.length} records from data/invitations.json`);

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    console.log(`📌 Target DB: "${DB_NAME}", Collection: "${COLLECTION_NAME}"`);

    // Wipe existing records in collection to replace with fresh seed data
    const deleteResult = await collection.deleteMany({});
    console.log(`🗑️ Cleared ${deleteResult.deletedCount} existing documents from "${COLLECTION_NAME}"`);

    // Insert fresh records into collection
    const result = await collection.insertMany(documents);
    console.log(`✅ Successfully seeded ${result.insertedCount} documents into collection "${COLLECTION_NAME}"!`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();
