import { z } from 'zod'
import { isValidPhoneNumber } from 'libphonenumber-js'

export const ContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(4, 'Full Name is required')
    .max(64, 'Full Name must be at most 64 characters'),
  email: z
    .string()
    .min(4, 'Email Address is required')
    .max(64, 'Email must be at most 64 characters')
    .email(),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone Number is required')
    // .optional()
    .refine(
      (value) => {
        // Allow empty string if you want phone to be optional
        // if (!value) return true
        return isValidPhoneNumber(value)
      },
      {
        message: 'Phone number required',
      },
    ),
  service: z.enum(['sauna', 'micro-house', 'tiny-house', 'custom-project']),
  message: z
    .string()
    .trim()
    .min(16, 'Project Details is required')
    .max(1024, 'Project Details must be at most 1024 characters'),
})

export const ContactEditSchema = ContactSchema.extend({
  status: z.enum(['new', 'todo', 'inprogress', 'completed']),
  referralCode: z.string().nullable(),
})

export type ContactFormValues = z.infer<typeof ContactSchema>
