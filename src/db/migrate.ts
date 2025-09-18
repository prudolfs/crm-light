import { migrate } from 'drizzle-orm/libsql/migrator'
import { db } from '@/db/config.server'

await migrate(db, { migrationsFolder: './src/db/migrations' })
