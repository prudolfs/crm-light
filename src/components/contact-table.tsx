'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { Contact, ContactFilters } from '@/types/contact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Search,
  Eye,
  Edit,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { formatDate } from '@/utils/format-date'
import { deleteContacts } from '@/actions/delete-contacts'
import { StatusBadge, ServiceBadge } from '@/components/badge'
import { ContactDeleteAll } from '@/components/contact-delete-all'

type Props = {
  contacts: Contact[]
}

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15]

function ContactTable({ contacts: initialContacts }: Props) {
  const [contacts, setContacts] = useState(initialContacts)
  const [filters, setFilters] = useState<ContactFilters>({
    search: '',
    service: 'all',
    status: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0])
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const filteredAndSortedContacts = useMemo(() => {
    const filtered = contacts
      .filter((contact) => {
        const searchMatch =
          contact.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          contact.email.toLowerCase().includes(filters.search.toLowerCase())

        const matchesService =
          filters.service === 'all' || contact.service === filters.service
        const matchesStatus =
          filters.status === 'all' || contact.status === filters.status

        return searchMatch && matchesService && matchesStatus
      })
      .toSorted((a, b) => {
        const aValue = a[filters.sortBy]
        const bValue = b[filters.sortBy]

        if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1
        if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1
        return 0
      })

    return filtered
  }, [contacts, filters])

  const totalPages = Math.ceil(filteredAndSortedContacts.length / itemsPerPage)
  const validCurrentPage = Math.min(currentPage, Math.max(1, totalPages))
  const startIndex = (validCurrentPage - 1) * itemsPerPage
  const paginatedContacts = filteredAndSortedContacts.slice(
    startIndex,
    startIndex + itemsPerPage,
  )

  const handleFilterChange = (key: keyof ContactFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const toggleSort = (field: 'createdAt' | 'updatedAt') => {
    if (filters.sortBy === field) {
      setFilters((prev) => ({
        ...prev,
        sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
      }))
    } else {
      setFilters((prev) => ({ ...prev, sortBy: field, sortOrder: 'asc' }))
    }
  }

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === paginatedContacts.length
        ? []
        : paginatedContacts.map((contact) => contact.id),
    )
  }

  const handleDeleteAll = async () => {
    if (selectedItems.length > 0) {
      await deleteContacts(selectedItems)

      setContacts((prevContacts) =>
        prevContacts.filter((contact) => !selectedItems.includes(contact.id)),
      )

      setSelectedItems([])
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="todo">Todo</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.service}
              onValueChange={(value) => handleFilterChange('service', value)}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="sauna">Sauna</SelectItem>
                <SelectItem value="micro-house">Micro House</SelectItem>
                <SelectItem value="tiny-house">Tiny House</SelectItem>
                <SelectItem value="custom-project">Custom Project</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={
                          selectedItems.length === paginatedContacts.length &&
                          paginatedContacts.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                      {selectedItems.length > 0 && (
                        <ContactDeleteAll onDeleteAll={handleDeleteAll} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => toggleSort('createdAt')}
                      className="-ml-3 flex items-center gap-1"
                    >
                      Created
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => toggleSort('updatedAt')}
                      className="-ml-3 flex items-center gap-1"
                    >
                      Updated
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedContacts.map((contact) => (
                  <TableRow key={contact.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(contact.id)}
                        onCheckedChange={() => handleSelectItem(contact.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {contact.name}
                    </TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>
                      <StatusBadge status={contact.status} />
                    </TableCell>
                    <TableCell>
                      <ServiceBadge service={contact.service} />
                    </TableCell>
                    <TableCell>{formatDate(contact.createdAt)}</TableCell>
                    <TableCell>{formatDate(contact.updatedAt)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/contact/${contact.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/contact/${contact.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between border-t p-4">
            <div className="flex items-center gap-4">
              <p className="text-muted-foreground text-sm">
                Showing {startIndex + 1} to{' '}
                {Math.min(
                  startIndex + itemsPerPage,
                  filteredAndSortedContacts.length,
                )}{' '}
                of {filteredAndSortedContacts.length} results
              </p>

              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Show</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(Number(value))
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option.toString()}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-muted-foreground text-sm">entries</span>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <span className="text-muted-foreground text-sm">
                  Page {currentPage} of {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { ContactTable }
