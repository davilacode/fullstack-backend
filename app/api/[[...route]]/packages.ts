import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

import { db } from "@/db/drizzel";
import { packages, insertPackagesSchema } from "@/db/schema";

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
    zValidator("json", insertPackagesSchema.pick({
      content: true,
      senderId: true,
      recipientId: true,
      from: true,
      to: true,
      hight: true,
      width: true,
      large: true,
      weight: true,
      trackingId: true,
      type: true,
      status: true,
    })),
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