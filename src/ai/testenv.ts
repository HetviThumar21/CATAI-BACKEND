import "dotenv/config";

console.log("database:", !!process.env.DATABASE_URL);
console.log("openai:", !!process.env.OPENAI_API_KEY);
console.log("pinecone:", !!process.env.PINECONE_API_KEY);
console.log("index:", process.env.PINECONE_INDEX);