import { Hono } from "hono";
import { handle } from "hono/vercel";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import documentRoute from "./document";

export const runtime = "edge"; // Define runtime as edge

// Initialize the Hono app
const app = new Hono();

// Add a global logger middleware
app.use("*", logger());

// Global error handler
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse(); // Handle HTTP exceptions specifically
  }
  return c.json({ error: "internal error" }, 500); // Generic error response
});

// Define the base path and attach the document routes
const routes = app.basePath("/api").route("/document", documentRoute);

console.log(routes);

// Root route for the API
app.get("/", (c) => {
  return c.json({
    message: "Hello from Ai Resume!", // Welcome message for the API root
  });
});

// Export the app's type for use in TypeScript
export type AppType = typeof routes;

// Export handlers for Vercel deployment
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);