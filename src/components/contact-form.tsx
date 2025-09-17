'use client'

import clsx from 'clsx'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'motion/react'
import { Send, Loader2 } from 'lucide-react'
import { isValidPhoneNumber } from 'react-phone-number-input'
import type { ContactInputs } from '@/types/contact'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PhoneInput } from '@/components/ui/phone-input'
import { ContactSchema } from '@/lib/validation/contact'
import { postContact } from '@/actions/post-contact'
import { cn } from '@/lib/utils'

function ContactForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInputs>({
    resolver: zodResolver(ContactSchema),
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit: SubmitHandler<ContactInputs> = async (data) => {
    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    const result = await postContact(data)
    setIsSubmitting(false)

    if (result.error) {
      setSubmitError('Error: Something went wrong. Please try again.')
    } else {
      setSubmitError(null)
      router.push('/message-sent')
      router.refresh()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0.25, scaleX: 0.75, scaleY: 0.75 }}
      whileInView={{ opacity: 1, scaleX: 1, scaleY: 1 }}
      transition={{
        opacity: { duration: 1 },
        scaleX: { type: 'spring', stiffness: 200, damping: 15 },
        scaleY: { type: 'spring', stiffness: 200, damping: 15 },
      }}
      viewport={{ once: true }}
      className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-4 backdrop-blur-xs lg:p-8"
    >
      <h2 className="mb-6 text-2xl font-bold">Start Your Project</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: true })}
              className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
            <div className={`mt-2 flex ${clsx(!errors.name && 'opacity-0')}`}>
              <p className="text-sm text-red-400">
                Error: {errors.name?.message}
              </p>
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: true })}
              className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
            <div className={`mt-2 flex ${clsx(!errors.email && 'opacity-0')}`}>
              <p className="text-sm text-red-400">
                Error: {errors.email?.message}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Phone Number
            </label>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: 'Phone number is required',
                validate: (value) => {
                  if (!value) {
                    return 'Phone number is required'
                  }

                  if (!isValidPhoneNumber(value)) {
                    return 'Please enter a valid phone number'
                  }
                  return true
                },
              }}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  value={value}
                  onChange={onChange}
                  placeholder="Phone number"
                  className="h-[50px] w-full"
                />
              )}
            />
            <div className={`mt-2 flex ${clsx(!errors.phone && 'opacity-0')}`}>
              <p className="text-sm text-red-400">
                Error: {errors.phone?.message}
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="service"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Service Interest
            </label>
            <Controller
              name="service"
              control={control}
              rules={{ required: 'Please select a service' }}
              render={({ field: { onChange, value } }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger
                    className={cn(
                      'w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-6 text-white placeholder-gray-400 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 [&>span]:text-base',
                      value ? '[&>span]:white' : '[&>span]:text-gray-400',
                    )}
                  >
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="border-slate-700 bg-slate-800">
                    <SelectItem
                      value="sauna"
                      className="text-base text-white! hover:bg-slate-700 focus:bg-slate-700"
                    >
                      Sauna
                    </SelectItem>
                    <SelectItem
                      value="micro-house"
                      className="text-base text-white! hover:bg-slate-700 focus:bg-slate-700"
                    >
                      Micro House
                    </SelectItem>
                    <SelectItem
                      value="tiny-house"
                      className="text-base text-white! hover:bg-slate-700 focus:bg-slate-700"
                    >
                      Tiny House
                    </SelectItem>
                    <SelectItem
                      value="custom-project"
                      className="text-base text-white! hover:bg-slate-700 focus:bg-slate-700"
                    >
                      Custom Project
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <div
              className={`mt-2 flex ${clsx(!errors.service && 'opacity-0')}`}
            >
              <p className="text-sm text-red-400">
                Error: Service Interest is required
              </p>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Project Details
          </label>
          <textarea
            id="message"
            {...register('message', { required: true })}
            rows={5}
            className="w-full resize-none rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-gray-400 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="Tell us about your dream project..."
          />
          <div className={`mt-2 flex ${clsx(!errors.message && 'opacity-0')}`}>
            <p className="text-sm text-red-400">
              Error: {errors.message?.message}
            </p>
          </div>
        </div>

        <div className="flex w-full gap-3">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700"
          >
            Send Message
            {isSubmitting ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
        <div className="mt-2 flex">
          <p className="text-sm text-red-400">{submitError}</p>
        </div>
      </form>
    </motion.div>
  )
}

export { ContactForm }
