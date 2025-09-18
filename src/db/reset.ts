import { reset } from 'drizzle-seed'
import { drizzle } from 'drizzle-orm/libsql'
import { client } from '@/db/config.server'
import * as schema from '@/db/schema.server'

async function main() {
  const db = drizzle(client)
  await reset(db, schema)
}

main().catch(console.error)
