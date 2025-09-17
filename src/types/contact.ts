import type { Contact, Note } from '@/db/schema.server'

export type ServiceType = Contact['service']
export type StatusType = Contact['status']

export type ContactFilters = {
  search: string
  service: ServiceType | 'all'
  status: StatusType | 'all'
  sortBy: 'createdAt' | 'updatedAt'
  sortOrder: 'asc' | 'desc'
}

export type { Contact }

export type ContactInputs = {
  name: string
  email: string
  phone: string
  service: ServiceType
  message: string
}

export type ContactEntry = {
  id: number
  referralCode: string | null
  status: StatusType
  createdAt: Date
  updatedAt: Date
  notes: Note[]
} & ContactInputs
