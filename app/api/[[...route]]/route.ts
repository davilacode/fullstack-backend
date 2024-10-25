import { Hono } from "hono"
import { handle } from "hono/vercel"
import { HTTPException } from "hono/http-exception"

import accounts from "./accounts"

const app = new Hono().basePath("/api")

const routes = app
  .route("/accounts", accounts)

app.onError((err, c) => {
  if(err instanceof HTTPException) {
    return err.getResponse()
  }

  return c.json({ error: "Internal Error" }, 500)
})


export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes