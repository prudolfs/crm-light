'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/db/config.server'
import { contactUs } from '@/db/schema.server'
import { ContactEntry } from '@/types/contact'
import { ContactSchema } from '@/lib/validation/contact'

export async function updateContact(id: number, data: ContactEntry) {
  const result = ContactSchema.safeParse(data)

  if (!result.success) {
    const fields = result.error.flatten()
    return { error: fields.fieldErrors }
  }

  await db
    .update(contactUs)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(contactUs.id, id))

  return { success: true }
}
