import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";

import { db } from "@/db/drizzel";
import { clients, insertClientsSchema } from "@/db/schema";

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
          id: clients.id,
          name: clients.name,
          phone: clients.phone,
          email: clients.email,
          address: clients.address
        })
        .from(clients);

      return c.json({ data });
  })
  .post(
    "/", 
    clerkMiddleware(),
    zValidator("json", insertClientsSchema.pick({
      name: true,
      email: true,
      phone: true,
      address: true,
    })),
    async (c) => {
      const auth = getAuth(c);
      const values = await c.req.json();

      if (!auth) {
        return c.json({ error: "Unauthorized" }, 401)
      }

      const data = await db.insert(clients).values({
        id: createId(),
        userId: auth.userId,
        ...values
      }).returning()

      return c.json({ data: data[0] });
  })

export default app;