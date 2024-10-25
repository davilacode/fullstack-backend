import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { db } from "@/db/drizzel";
import { accounts } from "@/db/schema";

const app = new Hono()
  .get(
    "/",
    clerkMiddleware(), 
    async (c) => {
      const auth = getAuth(c);

      if (!auth) {
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
      }

      const data = await db.select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts);

    return c.json({ data });
  });

export default app;