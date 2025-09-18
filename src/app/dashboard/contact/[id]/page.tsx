import Link from 'next/link'
import {
  ArrowLeft,
  Edit,
  Users,
  Mail,
  Phone,
  Code,
  MessageSquare,
  Calendar,
} from 'lucide-react'
import { formatDate } from '@/utils/format-date'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getContact } from '@/actions/get-contact'
import { StatusBadge, ServiceBadge } from '@/components/badge'
import { ContactDelete } from '@/components/contact-delete'
import { Notes } from '@/components/notes'

type Props = {
  params: {
    id: string
  }
  searchParams?: Record<string, string | string[] | undefined>
}

export default async function Contact({ params: { id } }: Props) {
  const contact = await getContact(id)

  if (!contact) {
    return <div>Contact not found</div>
  }

  return (
    <div className="container mx-auto min-h-lvh px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to List
            </Button>
          </Link>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/contact/${contact.id}/edit`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <ContactDelete id={contact.id} name={contact.name} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-medium">{contact.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Email Address</p>
                    <p className="font-medium">{contact.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Phone Number</p>
                    <p className="font-medium">{contact.phone}</p>
                  </div>
                </div>

                {contact.referralCode && (
                  <div className="flex items-center gap-3">
                    <Code className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Referral Code</p>
                      <p className="font-medium">{contact.referralCode}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 hidden lg:block">
            <Notes contactId={contact.id} initialNotes={contact.notes} />
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status & Service</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm text-gray-600">Status</p>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={contact.status} />
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm text-gray-600">Service Type</p>
                  <div className="flex items-center gap-2">
                    <ServiceBadge service={contact.service} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-gray-700">{contact.message}</p>
            </CardContent>
          </Card>

          <div className="lg:hidden">
            <Notes contactId={contact.id} initialNotes={contact.notes} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Timestamps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Created At</p>
                <p className="font-medium">{formatDate(contact.createdAt)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="font-medium">{formatDate(contact.updatedAt)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
