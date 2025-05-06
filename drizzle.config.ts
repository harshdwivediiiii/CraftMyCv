import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_V4z7lqRpBQUh@ep-cold-recipe-a48daf4n-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
  },
  verbose: true,
  strict: true,
});