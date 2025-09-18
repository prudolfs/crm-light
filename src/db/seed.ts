import { seed } from 'drizzle-seed'
import { drizzle } from 'drizzle-orm/libsql'
import { client } from '@/db/config.server'
import * as schema from '@/db/schema.server'

async function main() {
  const db = drizzle(client)
  await seed(db, { contactUs: schema.contactUs }).refine((f) => ({
    contactUs: {
      columns: {
        name: f.fullName(),
        email: f.email(),
        phone: f.phoneNumber({
          prefixes: ['+380 99', '+380 67', '+1'],
          generatedDigitsNumbers: [7, 7, 10],
        }),
        service: f.valuesFromArray({
          values: ['sauna', 'micro-house', 'tiny-house', 'custom-project'],
        }),
        status: f.valuesFromArray({
          values: ['new', 'todo', 'inprogress', 'completed'],
        }),
        createdAt: f.date({ minDate: '2020-01-01', maxDate: new Date() }),
        updatedAt: f.date({ minDate: '2020-01-01', maxDate: new Date() }),
      },
      count: 40,
    },
  }))
}

main().catch(console.error)
