'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/db/config.server'
import { contactUs } from '@/db/schema.server'
import { ContactEditValues, ContactEditSchema } from '@/lib/validation/contact'

export async function updateContact(id: number, data: ContactEditValues) {
  const result = ContactEditSchema.safeParse(data)

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
