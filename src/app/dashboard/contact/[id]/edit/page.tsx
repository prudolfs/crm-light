import Link from 'next/link'
import { ArrowLeft, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ContactEdit } from '@/components/contact-edit'
import { getContact } from '@/actions/get-contact'

type Props = {
  params: {
    id: string
  }
  searchParams?: Record<string, string | string[] | undefined>
}

export default async function EditContact({ params: { id } }: Props) {
  const contact = await getContact(id)

  if (!contact) {
    return <div>Contact not found</div>
  }

  return (
    <div className="container mx-auto min-h-lvh px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to List
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" type="submit" form="contact-edit-form">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/contact/${contact.id}`}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Link>
            </Button>
          </div>
        </div>

        <ContactEdit contact={contact} />
      </div>
    </div>
  )
}
