import { Hono } from "hono"
import { handle } from "hono/vercel"

import clients from "./clients"
import packages from "./packages"

const app = new Hono().basePath("/api")

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/clients", clients)
  .route("/packages", packages)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes