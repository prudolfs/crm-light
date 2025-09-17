'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/db/config.server'
import { contactUs } from '@/db/schema.server'

export async function deleteContact(id: number) {
  await db.delete(contactUs).where(eq(contactUs.id, id))
}
