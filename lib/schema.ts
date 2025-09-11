import { z } from 'zod'

export const contactFormSchema = z.object({
  customer_name: z.string().min(2, {
    message: 'Name must be at least 2 characters long.',
  }),
  company_name: z.string().optional(),
  email_address: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone_number: z.string().optional(),
  product_id: z.string().min(2, {
    message: 'Product ID must be at least 2 characters long.',
  }),
  product_name: z.string().min(2, {
    message: 'Product name must be at least 2 characters long.',
  }),
  message: z
    .string()
    .min(10, {
      message: 'Message must be at least 10 characters long.',
    })
    .max(500, {
      message: 'Message cannot be longer than 500 characters.',
    }),
})
