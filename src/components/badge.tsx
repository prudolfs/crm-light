import { Badge } from '@/components/ui/badge'
import type { ServiceType, StatusType } from '@/types/contact'

const statusColors: Record<StatusType, string> = {
  new: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  todo: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
  inprogress: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  completed: 'bg-green-100 text-green-800 hover:bg-green-200',
}

const serviceColors: Record<ServiceType, string> = {
  sauna: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  'micro-house': 'bg-teal-100 text-teal-800 hover:bg-teal-200',
  'tiny-house': 'bg-pink-100 text-pink-800 hover:bg-pink-200',
  'custom-project': 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
}

export function StatusBadge({ status }: { status: StatusType }) {
  return <Badge className={statusColors[status]}>{status}</Badge>
}

export function ServiceBadge({ service }: { service: ServiceType }) {
  return (
    <Badge className={serviceColors[service]}>
      {service.replace('-', ' ')}
    </Badge>
  )
}
