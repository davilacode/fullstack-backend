import 'dotenv/config'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL!

export const sql = postgres(connectionString, { prepare: false })
export const db = drizzle(sql);