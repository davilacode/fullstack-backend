import { z } from "zod";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";

import { db } from "@/db/drizzel";
import { clients, insertClientsSchema } from "@/db/schema";
import { eq } from "drizzle-orm";

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
  .get(
    "/:id", 
    clerkMiddleware(), 
    zValidator("param", z.object({
      id: z.string().optional()
    })),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Bad request" }, 401)
      }

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401)
      }

      const data = await db.select({
        id: clients.id,
        name: clients.name,
        phone: clients.phone,
        email: clients.email,
        address: clients.address
      })
      .from(clients)
      .where(
        eq(clients.id, id)
      );

      if (!data.length) {
        return c.json({ error: "Not found" }, 404)
      }

      return c.json({ data: data[0] });
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
  .patch(
    "/:id", 
    clerkMiddleware(),
    zValidator("param", z.object({
      id: z.string().optional()
    })),
    zValidator("json", insertClientsSchema.pick({
      name: true,
      email: true,
      phone: true,
      address: true,
    })),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const values = await c.req.json();

      if (!id) {
        return c.json({ error: "Bad request" }, 401)
      }

      if (!auth) {
        return c.json({ error: "Unauthorized" }, 401)
      }

      const data = await db.update(clients).set(values).where(
        eq(clients.id, id)
      ).returning()

      if (!data.length) {
        return c.json({ error: "Not found" }, 404)
      }

      return c.json({ data: data[0] });
  })
  .delete(
    "/:id", 
    clerkMiddleware(),
    zValidator("param", z.object({
      id: z.string().optional()
    })),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Bad request" }, 401)
      }

      if (!auth) {
        return c.json({ error: "Unauthorized" }, 401)
      }

      const data = await db.delete(clients).where(
        eq(clients.id, id)
      ).returning({
        id: clients.id,
      })

      if (!data.length) {
        return c.json({ error: "Not found" }, 404)
      }

      return c.json({ data: data[0] });
  })

export default app;