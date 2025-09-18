import { formatDistanceToNow, differenceInDays, format } from 'date-fns'

export function formatDate(
  date: Date,
  threshold: number = 7,
  dateFormat: string = 'MMM d, yyyy',
): string {
  const now = new Date()
  const daysDifference = differenceInDays(now, date)

  if (daysDifference < threshold) {
    return formatDistanceToNow(date, { addSuffix: true })
  } else {
    return format(date, dateFormat)
  }
}
