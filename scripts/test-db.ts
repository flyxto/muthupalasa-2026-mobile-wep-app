import { getClientPromise, DEFAULT_DB_NAME, INVITATIONS_COLLECTION } from "../lib/mongodb";

const DB_NAME = process.env.MONGODB_DB || DEFAULT_DB_NAME;
const COLLECTION_NAME = process.env.MONGODB_COLLECTION || INVITATIONS_COLLECTION;

async function testConnection() {
  console.log("🔍 Attempting to connect to MongoDB...");
  const maskedUri = process.env.MONGODB_URI?.replace(/\/\/[^:]+:[^@]+@/, "//***:***@");
  console.log(`URI: ${maskedUri}`);

  try {
    const client = await getClientPromise();
    console.log("✅ MongoClient successfully connected!");

    const db = client.db(DB_NAME);
    console.log(`📌 Target Database: "${db.databaseName}"`);

    // Ping admin database to verify active connection
    const pingResult = await db.admin().ping();
    console.log("🟢 Ping result:", pingResult);

    // Target specific collection
    const collection = db.collection(COLLECTION_NAME);
    const count = await collection.countDocuments();
    console.log(`📑 Collection "${COLLECTION_NAME}" document count: ${count}`);

    if (count > 0) {
      const sampleDoc = await collection.findOne();
      console.log("📄 Sample document:", JSON.stringify(sampleDoc, null, 2));
    } else {
      console.log(`ℹ️ Collection "${COLLECTION_NAME}" is ready (currently 0 documents).`);
    }

    console.log("\n🎉 MongoDB Connection Test Completed Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ MongoDB connection failed:", error);
    process.exit(1);
  }
}

testConnection();
