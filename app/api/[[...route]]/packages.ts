import { z } from "zod";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { aliasedTable, eq } from "drizzle-orm";

import { db } from "@/db/drizzel";
import { packages, clients, insertPackagesSchema } from "@/db/schema";
import { generateTrackingNumber } from "@/lib/utils";

const app = new Hono()
  .get(
    "/",
    clerkMiddleware(), 
    async (c) => {
      const auth = getAuth(c);

      if (!auth) {
        return c.json({ error: "Unauthorized" }, 401)
      }

      const senders = aliasedTable(clients, "senders")
      const recipients = aliasedTable(clients, "recipients")

      const data = await db.select({
        id: packages.id,
        content: packages.content,
        senderId: packages.senderId,
        recipientId: packages.recipientId,
        senderName: senders.name,
        recipientName: recipients.name,
        from: packages.from,
        to: packages.to,
        height: packages.height,
        width: packages.width,
        large: packages.large,
        weight: packages.weight,
        trackingId: packages.trackingId,
        type: packages.type,
        status: packages.status,
        createdAt: packages.createdAt,
        updatedAt: packages.updatedAt
      })
      .from(packages)
      .innerJoin(senders, eq(packages.senderId, senders.id))
      .innerJoin(recipients, eq(packages.senderId, recipients.id));

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
        id: packages.id,
        content: packages.content,
        senderId: packages.senderId,
        recipientId: packages.recipientId,
        from: packages.from,
        to: packages.to,
        height: packages.height,
        width: packages.width,
        large: packages.large,
        weight: packages.weight,
        trackingId: packages.trackingId,
        type: packages.type,
        status: packages.status,
        createdAt: packages.createdAt,
        updatedAt: packages.updatedAt
      })
      .from(packages)
      .where(
        eq(packages.id, id)
      );

      if (!data.length) {
        return c.json({ error: "Not found" }, 404)
      }

      return c.json({ data: data[0] });
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
      height: true,
      width: true,
      large: true,
      weight: true,
      type: true
    })),
    async (c) => {
      const auth = getAuth(c);
      const values = await c.req.json();

      if (!auth) {
        return c.json({ error: "Unauthorized" }, 401)
      }

      const data = await db.insert(packages).values({
        id: createId(),
        userId: auth.userId,
        trackingId: generateTrackingNumber(),
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
    zValidator("json", insertPackagesSchema.pick({
      content: true,
      senderId: true,
      recipientId: true,
      from: true,
      to: true,
      height: true,
      width: true,
      large: true,
      weight: true,
      type: true,
      status: true,
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

      const data = await db.update(packages).set(values).where(
        eq(packages.id, id)
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

      const data = await db.delete(packages).where(
        eq(packages.id, id)
      ).returning({
        id: packages.id,
      })

      if (!data.length) {
        return c.json({ error: "Not found" }, 404)
      }

      return c.json({ data: data[0] });
  })

export default app;