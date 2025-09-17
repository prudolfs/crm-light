import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import Database from 'better-sqlite3'
import path from 'path'
import * as schema from '@/db/schema.server'

const databaseDir = process.env.DATABASE_DIR || './src/db/data'
const databasePath = path.join(databaseDir, 'sqlite.db')
console.log('Database path:', databasePath)
const sqlite = new Database(databasePath)

sqlite.pragma('foreign_keys = ON')

export const db: BetterSQLite3Database<typeof schema> = drizzle(sqlite, {
  schema,
})

migrate(db, { migrationsFolder: './src/db/migrations' })
