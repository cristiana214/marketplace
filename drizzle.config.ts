import { defineConfig } from "drizzle-kit";

// Define the configuration for Drizzle
export default defineConfig({
  dialect: "mysql", // The database dialect
  schema: "./src/drizzle/schema/account.ts", // Path to your schema
  // out: "./src/drizzle/test", // Output directory
  dbCredentials: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "market_auth",
  },
});
