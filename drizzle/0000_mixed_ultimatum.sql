CREATE TYPE "public"."status" AS ENUM('transit', 'delivered', 'pending', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."type" AS ENUM('letter', 'package');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "clients" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" numeric,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "packages" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"sender_id" text NOT NULL,
	"recipient_id" text NOT NULL,
	"from" text NOT NULL,
	"to" text NOT NULL,
	"hight" numeric NOT NULL,
	"width" numeric NOT NULL,
	"large" numeric NOT NULL,
	"weight" numeric NOT NULL,
	"tracking_id" numeric NOT NULL,
	"type" "type",
	"status" "type",
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "packages" ADD CONSTRAINT "packages_sender_id_clients_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "packages" ADD CONSTRAINT "packages_recipient_id_clients_id_fk" FOREIGN KEY ("recipient_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
