'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/db/config.server'
import { contactUs } from '@/db/schema.server'

export async function getContact(id: string) {
  const contact = await db.query.contactUs.findFirst({
    where: (contact, { eq }) => eq(contact.id, parseInt(id)),
  })

  if (!contact) {
    return null
  }

  if (contact.status === 'new') {
    const now = new Date()

    await db
      .update(contactUs)
      .set({
        status: 'todo',
        updatedAt: now,
      })
      .where(eq(contactUs.id, contact.id))
      .run()

    contact.status = 'todo'
    contact.updatedAt = now
  }

  const notes = await db.query.notes.findMany({
    where: (note, { eq }) => eq(note.contactId, contact.id),
  })

  return { ...contact, notes }
}
