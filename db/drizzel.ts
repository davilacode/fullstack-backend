import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

// Este es el único archivo que importa postgress y drizzle en el proyecto
export const client = postgres(process.env.DATABASE_URL!)
export const db = drizzle(client);
