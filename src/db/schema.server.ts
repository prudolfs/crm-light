import { InferSelectModel, sql } from 'drizzle-orm'
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const contactUs = sqliteTable('contact_us', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  service: text('service', {
    enum: ['sauna', 'micro-house', 'tiny-house', 'custom-project'],
  }).notNull(),
  message: text('message').notNull(),
  status: text('status', { enum: ['new', 'todo', 'inprogress', 'completed'] })
    .notNull()
    .default('new'),
  referralCode: text('referral_code'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export const notes = sqliteTable('notes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  contactId: integer('contact_id').references(() => contactUs.id, {
    onDelete: 'cascade',
  }),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export type Note = InferSelectModel<typeof notes>
export type Contact = InferSelectModel<typeof contactUs>
