'use server'

import { inArray } from 'drizzle-orm'
import { db } from '@/db/config.server'
import { contactUs } from '@/db/schema.server'

export async function deleteContacts(ids: number[]) {
  if (ids.length === 0) {
    return
  }

  await db.delete(contactUs).where(inArray(contactUs.id, ids))
}
