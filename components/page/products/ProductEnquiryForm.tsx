'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema } from '@/lib/schema'
import type { ContactFormData } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { postProductEnquiry } from '@/service/products'

// Define props for the component
interface ProductEnquiryFormProps {
  productId: string
  productName: string
}

export function ProductEnquiryForm({ productId, productName }: ProductEnquiryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      product_id: productId,
      product_name: productName,
      customer_name: '',
      company_name: '',
      email_address: '',
      phone_number: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      await postProductEnquiry(data)
      toast('Enquiry Sent! Thank you for your interest. We will get back to you shortly.')

      reset() // Reset the form fields after successful submission
    } catch (error) {
      console.error('Submission error:', error)
      toast('Submission Failed! Something went wrong. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 border shadow px-8 py-8 h-full rounded-lg"
    >
      {/* Hidden fields for product info */}
      <input type="hidden" {...register('product_id')} />
      <input type="hidden" {...register('product_name')} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer Name */}
        <div className="space-y-2">
          <Label htmlFor="customer_name">Your Name</Label>
          <Input id="customer_name" placeholder="John Doe" {...register('customer_name')} />
          {errors.customer_name && (
            <p className="text-sm text-red-500">{errors.customer_name.message}</p>
          )}
        </div>

        {/* Company Name */}
        <div className="space-y-2">
          <Label htmlFor="company_name">Company Name (Optional)</Label>
          <Input id="company_name" placeholder="Pro Tech Inc." {...register('company_name')} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email Address */}
        <div className="space-y-2">
          <Label htmlFor="email_address">Email Address</Label>
          <Input
            id="email_address"
            type="email"
            placeholder="you@company.com"
            {...register('email_address')}
          />
          {errors.email_address && (
            <p className="text-sm text-red-500">{errors.email_address.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phone_number">Phone Number (Optional)</Label>
          <Input id="phone_number" placeholder="+1 (555) 123-4567" {...register('phone_number')} />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">Your Message</Label>
        <Textarea
          id="message"
          className="h-36"
          placeholder="I would like to know the price and availability..."
          {...register('message')}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Enquiry'}
      </Button>
    </form>
  )
}
