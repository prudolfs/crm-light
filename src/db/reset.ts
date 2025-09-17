import Database from 'better-sqlite3'
import path from 'path'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { reset } from 'drizzle-seed'
import * as schema from '@/db/schema.server'

async function main() {
  const databaseDir = process.env.DATABASE_DIR || './db/data'
  const databasePath = path.join(databaseDir, 'sqlite.db')
  const sqlite = new Database(databasePath)
  const db = drizzle(sqlite)
  await reset(db, schema)
}

main()
