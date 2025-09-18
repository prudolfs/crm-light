'use client'

import clsx from 'clsx'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { updateContact } from '@/actions/update-contact'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ContactEditSchema, ContactEditValues } from '@/lib/validation/contact'
import type { ContactEntry } from '@/types/contact'

function ContactEdit({ contact }: { contact: ContactEntry }) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactEditValues>({
    defaultValues: {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      service: contact.service,
      message: contact.message,
      status: contact.status,
      referralCode: contact.referralCode,
    },
    resolver: zodResolver(ContactEditSchema),
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit: SubmitHandler<ContactEditValues> = async (data) => {
    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    const result = await updateContact(contact.id, data)
    setIsSubmitting(false)

    if (result.error) {
      setSubmitError('Error: Something went wrong. Please try again.')
    } else {
      setSubmitError(null)
      router.push(`/dashboard/contact/${contact.id}`)
      router.refresh()
    }
  }

  return (
    <form
      id="contact-edit-form"
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register('name', { required: true })} />
              <div className={`mt-2 flex ${clsx(!errors.name && 'opacity-0')}`}>
                <p className="text-sm text-red-400">
                  Error: {errors.name?.message}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email', { required: true })}
              />
              <div
                className={`mt-2 flex ${clsx(!errors.email && 'opacity-0')}`}
              >
                <p className="text-sm text-red-400">
                  Error: {errors.email?.message}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone', { required: true })}
              />
              <div
                className={`mt-2 flex ${clsx(!errors.phone && 'opacity-0')}`}
              >
                <p className="text-sm text-red-400">
                  Error: {errors.phone?.message}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="referralCode">Referral Code</Label>
              <Input id="referralCode" {...register('referralCode')} />
              <div
                className={`mt-2 flex ${clsx(!errors.referralCode && 'opacity-0')}`}
              >
                <p className="text-sm text-red-400">
                  Error: {errors.referralCode?.message}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="service">Service Type</Label>
              <Controller
                name="service"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select value={value} onValueChange={onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sauna">Sauna</SelectItem>
                      <SelectItem value="micro-house">Micro House</SelectItem>
                      <SelectItem value="tiny-house">Tiny House</SelectItem>
                      <SelectItem value="custom-project">
                        Custom Project
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select value={value} onValueChange={onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="todo">Todo</SelectItem>
                      <SelectItem value="inprogress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              {...register('message', { required: true })}
              rows={4}
            />
            <div
              className={`mt-2 flex ${clsx(!errors.message && !submitError && 'opacity-0')}`}
            >
              <p className="text-sm text-red-400">
                Error: {errors.message?.message || submitError}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

export { ContactEdit }
