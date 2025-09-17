'use server'

import { db } from '@/db/config.server'

export async function getContacts() {
  const contactUs = await db.query.contactUs.findMany()
  return contactUs
}
