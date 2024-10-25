import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

import { db } from "@/db/drizzel";
import { packages } from "@/db/schema";

const app = new Hono()
  .get(
    "/",
    clerkMiddleware(), 
    async (c) => {
      const auth = getAuth(c);

      if (!auth) {
        return c.json({ error: "Unauthorized" }, 401)
      }

      const data = await db.select({
          id: packages.id,
          content: packages.content,
        })
        .from(packages)

      return c.json({ data });
  })
  .post(
    "/", 
    clerkMiddleware(), 
    async (c) => {
      const auth = getAuth(c);
      const values = await c.req.json();

      if (!auth) {
        return c.json({ error: "Unauthorized" }, 401)
      }

      const [data] = await db.insert(packages).values({
        id: createId(),
        userId: auth.userId,
        ...values
      }).returning()


      return c.json({ data });
  })

export default app;