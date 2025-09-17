'use server'

import { db } from '@/db/config.server'
import { notes } from '@/db/schema.server'

export async function postNote(contactId: number, content: string) {
  const [newNote] = await db
    .insert(notes)
    .values({
      contactId,
      content,
      createdAt: new Date(),
    })
    .returning()

  return newNote
}
