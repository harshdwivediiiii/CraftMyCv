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

// Assign your routes here
const routes = app.basePath("/api").route("/document", documentRoute);

app.get("/", (c) => {
  return c.json({
    message: "Hello from Ai Resume!",
  });
});

export type AppType = typeof routes;

// Use the `routes` for the handler
export const GET = handle(routes);
export const POST = handle(routes);
export const PATCH = handle(routes);
