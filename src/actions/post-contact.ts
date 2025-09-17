'use server'

import { cookies } from 'next/headers'
import { ContactInputs } from '@/types/contact'
import { db } from '@/db/config.server'
import { contactUs } from '@/db/schema.server'
import { ContactSchema } from '@/lib/validation/contact'

export async function postContact(data: ContactInputs) {
  const result = ContactSchema.safeParse(data)

  if (!result.success) {
    const fields = result.error.flatten()
    return { error: fields.fieldErrors }
  }

  const now = new Date()

  await db.insert(contactUs).values({
    ...data,
    referralCode: (await cookies()).get('referralCode')?.value,
    createdAt: now,
    updatedAt: now,
  })

  return { success: true }
}
