import { Hono } from "hono";
import { handle } from "hono/vercel";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import documentRoute from "./document";

export const runtime = "edge";

const app = new Hono();

app.use("*", logger());

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json({ error: "internal error" });
});

// Create routes and assign it as a runtime object
const routes = app.basePath("/api").route("/document", documentRoute);

app.get("/", (c) => {
  return c.json({
    message: "Hello from Ai Resume!",
  });
});

// Use `routes` in the exports for handler functions
export type AppType = typeof routes;

export const GET = handle(routes); // Using routes here
export const POST = handle(routes); // Using routes here
export const PATCH = handle(routes); // Using routes here
