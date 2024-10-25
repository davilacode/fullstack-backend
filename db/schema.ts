import { pgTable, pgEnum, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod"

// Esquema de la tabla clients
export const clients = pgTable("clients", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  address: text("address").notNull(),
  userId: text("user_id").notNull()
});

export const insertClientsSchema = createInsertSchema(clients);

// Enumerador de tipo de paquete
export const packageTypeEnum = pgEnum('type', ['letter', 'package']);
// Enumerador de estado de paquete
export const packageStatusEnum = pgEnum('status', ['transit', 'delivered', 'pending', 'cancelled']);

// Esquema de la tabla packages
export const packages = pgTable("packages", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  senderId: text("sender_id").references(() => clients.id).notNull(),
  recipientId: text("recipient_id").references(() => clients.id).notNull(),
  from: text("from").notNull(),
  to: text("to").notNull(),
  hight: numeric("hight").notNull(),
  width: numeric("width").notNull(),
  large: numeric("large").notNull(),
  weight: numeric("weight").notNull(),
  trackingId: numeric("tracking_id").notNull(),
  type: packageTypeEnum(),
  status: packageTypeEnum(),
  createdAt: timestamp().notNull(), 
  updatedAt: timestamp().notNull(),
  userId: text("user_id").notNull()
});

export const insertPackagesSchema = createInsertSchema(packages);