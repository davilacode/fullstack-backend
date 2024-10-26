import { pgTable, pgEnum, text, timestamp, decimal } from "drizzle-orm/pg-core";
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
export const packageTypeEnum = pgEnum('package_type', ['letter', 'package']);
// Enumerador de estado de paquete
export const packageStatusEnum = pgEnum('package_status', ['pending', 'transit', 'delivered', 'cancelled']);

// Esquema de la tabla packages
export const packages = pgTable("packages", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  senderId: text("sender_id").references(() => clients.id).notNull(),
  recipientId: text("recipient_id").references(() => clients.id).notNull(),
  from: text("from").notNull(),
  to: text("to").notNull(),
  height: decimal("height").notNull(),
  width: decimal("width").notNull(),
  large: decimal("large").notNull(),
  weight: decimal("weight").notNull(),
  trackingId: text("tracking_id").notNull(),
  type: packageTypeEnum('type').default('letter').notNull(),
  status: packageStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp().notNull().defaultNow(), 
  updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
  userId: text("user_id").notNull()
});

export const insertPackagesSchema = createInsertSchema(packages);