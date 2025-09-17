'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/db/config.server'
import { notes } from '@/db/schema.server'

export async function deleteNote(id: number) {
  await db.delete(notes).where(eq(notes.id, id))
}
