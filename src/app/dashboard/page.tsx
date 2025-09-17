import ContactTable from '@/components/ContactTable'
import { getContacts } from '@/actions/get-contacts'

export default async function Dashboard() {
  const contacts = await getContacts()

  return (
    <div className="container mx-auto min-h-lvh px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Customer Relationship Management
        </h1>
        <p className="text-gray-600">
          Manage and browse your data entries with advanced filtering and search
          capabilities.
        </p>
      </div>
      <ContactTable contacts={contacts} />
    </div>
  )
}
