import { z } from "zod";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";

import { db } from "@/db/drizzel";
import { clients, insertClientsSchema } from "@/db/schema";
import { eq } from "drizzle-orm";


const app = new Hono()

  // GET /api/clients - Lista todos los clientes
  .get(
    "/",
    clerkMiddleware(), 
    async (c) => {

      const auth = getAuth(c);

      // Validación de autenticación
      if (!auth) {
        return c.json({ error: "Unauthorized" }, 401)
      }

      // Consulta a la base de datos
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
  // GET /api/clients/:id - Obtiene un cliente por su id
  .get(
    "/:id", 
    clerkMiddleware(), 
    // Validación de parámetros
    zValidator("param", z.object({
      id: z.string().optional()
    })),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      // Validación de parámetros
      if (!id) {
        return c.json({ error: "Bad request" }, 401)
      }

      // Validación de autenticación
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

      // Validación de existencia
      if (!data.length) {
        return c.json({ error: "Not found" }, 404)
      }

      return c.json({ data: data[0] });
  })
  // POST /api/clients - Crea un nuevo cliente
  .post(
    "/", 
    clerkMiddleware(),
    // Validación de esquema
    zValidator("json", insertClientsSchema.pick({
      name: true,
      email: true,
      phone: true,
      address: true,
    })),
    async (c) => {
      const auth = getAuth(c);
      const values = await c.req.json();

      // Validación de autenticación
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
  // PATCH /api/clients/:id - Actualiza un cliente por su id
  .patch(
    "/:id", 
    clerkMiddleware(),
    zValidator("param", z.object({
      id: z.string().optional()
    })),
    // Validación de esquema
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

      // Validación de parámetros
      if (!id) {
        return c.json({ error: "Bad request" }, 401)
      }

      // Validación de autenticación
      if (!auth) {
        return c.json({ error: "Unauthorized" }, 401)
      }

      const data = await db.update(clients).set(values).where(
        eq(clients.id, id)
      ).returning()

      // Validación de existencia
      if (!data.length) {
        return c.json({ error: "Not found" }, 404)
      }

      return c.json({ data: data[0] });
  })
  // DELETE /api/clients/:id - Elimina un cliente por su id
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